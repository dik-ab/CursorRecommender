from cryptography.fernet import Fernet
from django.conf import settings


class Cipher:
    def __init__(self, key: str):
        self.fernet = Fernet(bytes(key, 'utf-8'))

    def encrypt(self, data: str) -> str:
        encrypted_pass = self.fernet.encrypt(bytes(data, 'utf-8'))
        return encrypted_pass.decode('utf-8')

    def decrypt(self, data: str) -> str:
        decrypted_pass = self.fernet.decrypt(bytes(data, 'utf-8'))
        return decrypted_pass.decode('utf-8')
