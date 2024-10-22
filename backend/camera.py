import cv2
import torch
import numpy as np
import urllib.request
import base64
import time
import random

class Camera:
    def __init__(self, mock=False):
        self.mock = mock
        if not self.mock:
            self.path = 'best.pt'  # Caminho do modelo
            self.image_url = 'http://192.168.10.250/cam-hi.jpg'  # URL da câmera
            self.model = torch.hub.load('ultralytics/yolov5', 'custom', self.path, force_reload=True)
            self.model.conf = 0.6

    def stream_frames(self):
        while True:
            if self.mock:
                # Gerar frame e acurácia simulados
                frame = self.generate_mock_frame()
                accuracy = random.uniform(0, 100)
            else:
                # Código original para captura real
                img_resp = urllib.request.urlopen(url=self.image_url)
                imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
                im = cv2.imdecode(imgnp, -1)
                results = self.model(im)
                frame = np.squeeze(results.render())

                # Converter frame para JPEG
                ret, jpeg = cv2.imencode('.jpg', frame)
                frame_data = base64.b64encode(jpeg.tobytes()).decode('utf-8')

                # Extrair a acurácia
                if results.xyxy[0].shape[0] > 0:
                    accuracy = float(results.xyxy[0][0][4]) * 100
                else:
                    accuracy = 0.0

            # Retornar frame e acurácia
            yield (frame, accuracy)

            time.sleep(0.1)  # Controlar a taxa de quadros

    def generate_mock_frame(self):
        # Criar uma imagem dummy para teste
        dummy_image = np.zeros((480, 640, 3), dtype=np.uint8)
        cv2.putText(dummy_image, 'Teste', (200, 240), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 3)
        ret, jpeg = cv2.imencode('.jpg', dummy_image)
        frame_data = base64.b64encode(jpeg.tobytes()).decode('utf-8')
        return frame_data
