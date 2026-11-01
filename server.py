"""
HealVoice OPD Kiosk - Local Vision AI Server
Runs a lightweight local HTTP server on port 5000.
Bypasses browser file:/// CORS restrictions and directly calls Vision AI.
"""

import http.server
import json
import os
import sys
import urllib.request
import urllib.error
import webbrowser

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class KioskHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/scan':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            
            try:
                req_data = json.loads(body)
                image_base64 = req_data.get('image', '')
                api_key = req_data.get('api_key', '').strip()

                mime_type = 'image/jpeg'
                clean_base64 = image_base64
                if ',' in image_base64:
                    header, clean_base64 = image_base64.split(',', 1)
                    if 'image/png' in header:
                        mime_type = 'image/png'
                    elif 'image/webp' in header:
                        mime_type = 'image/webp'

                if not api_key:
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'success': False,
                        'error': 'No API key provided. Please enter your Gemini API key in the kiosk header.'
                    }).encode('utf-8'))
                    return

                prompt = """You are an expert hospital clinical OCR AI for an OPD Kiosk.
Analyze this medical prescription, doctor note, or clinical report.
Even if handwritten in cursive, transcribe and extract the clinical information accurately.

Step 1: Check if this is an actual medical document.
If NOT medical (e.g. textbook page, invoice, code, general article):
{
  "is_valid_medical_doc": false,
  "document_type": "Non-Medical Document",
  "detected_topic": "Short summary of what this document actually is",
  "diagnosis": "None",
  "symptoms": [],
  "medications": [],
  "recommended_department": "Requires Medical Prescription"
}

If IT IS a medical document:
{
  "is_valid_medical_doc": true,
  "document_type": "Prescription / Clinical Report",
  "doctor_name": "Doctor name with degrees if present",
  "clinic_or_hospital": "Hospital or Clinic name",
  "patient_name": "Patient name",
  "diagnosis": "Primary diagnosis or reason for visit",
  "symptoms": ["Symptom 1", "Symptom 2"],
  "medications": [
    { "name": "Medicine name with strength", "dosage": "Dosage/frequency (e.g. 1-0-1)", "timing": "Instructions (e.g. After meals)" }
  ],
  "recommended_department": "Recommended OPD Department (e.g. General Medicine OPD, Dental OPD, Pediatric OPD)"
}
Return ONLY valid JSON without any markdown formatting or backticks."""

                gemini_payload = {
                    "contents": [{
                        "parts": [
                            {"text": prompt},
                            {"inlineData": {"mimeType": mime_type, "data": clean_base64}}
                        ]
                    }],
                    "generationConfig": {
                        "temperature": 0.1,
                        "topP: 0.95"
                    }
                }

                # Try available Gemini Vision models
                models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-2.0-flash", "gemini-1.5-pro"]
                parsed_result = None
                last_error = ""

                for model in models:
                    try:
                        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
                        req = urllib.request.Request(
                            url,
                            data=json.dumps(gemini_payload).encode('utf-8'),
                            headers={'Content-Type': 'application/json'}
                        )
                        with urllib.request.urlopen(req, timeout=25) as response:
                            res_body = response.read().decode('utf-8')
                            res_json = json.loads(res_body)
                            candidates = res_json.get('candidates', [])
                            if candidates:
                                parts = candidates[0].get('content', {}).get('parts', [])
                                if parts:
                                    raw_text = parts[0].get('text', '')
                                    raw_text = raw_text.replace('```json', '').replace('```', '').strip()
                                    start = raw_text.find('{')
                                    end = raw_text.rfind('}')
                                    if start != -1 and end != -1:
                                        parsed_result = json.loads(raw_text[start:end+1])
                                        parsed_result['engine'] = f"Google Gemini 1.5 Vision ({model})"
                                        break
                    except urllib.error.HTTPError as he:
                        err_content = he.read().decode('utf-8', errors='ignore')
                        last_error = f"HTTP {he.code}: {err_content}"
                    except Exception as ex:
                        last_error = str(ex)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()

                if parsed_result:
                    self.wfile.write(json.dumps({'success': True, 'data': parsed_result}).encode('utf-8'))
                else:
                    self.wfile.write(json.dumps({'success': False, 'error': last_error}).encode('utf-8'))

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
        else:
            super().do_POST()

def start_server():
    server_address = ('', PORT)
    httpd = http.server.HTTPServer(server_address, KioskHandler)
    print(f"==================================================")
    print(f" HealVoice OPD Kiosk running at http://localhost:{PORT}")
    print(f" Press Ctrl+C to stop server")
    print(f"==================================================")
    webbrowser.open(f"http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == '__main__':
    start_server()

