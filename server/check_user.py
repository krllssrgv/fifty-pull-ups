import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

from random import choices
from string import ascii_lowercase, digits



def send_email(email, code):
    server = 'smtp.yandex.ru'
    port = 465
    from_email = 'fputeam@yandex.ru'

    msg = MIMEMultipart()
    msg['From'] = formataddr(('FiftyPullUps', from_email))
    msg['To'] = email
    msg['Subject'] = 'Подтверждение регистрации'

    body = f'Благодарим за регистрацию на FiftyPullUps!\nКод подтверждения: {code}\n\nС уважением, команда FPU!'
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP_SSL(server, port) as server:
            server.login('fputeam', 'wrodsdnewiecorih')
            server.send_message(msg)
        return {'success': True}
    except Exception as e:
        return {'success': False, 'error': e}


def create_code():
    characters = ascii_lowercase + digits
    return ''.join(choices(characters, k=10))