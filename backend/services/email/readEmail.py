email_pass = "RTt1ww1rTCdgL0Npge3H"
email_addr = "telemetry@nordal.kz"
import imaplib
import email
import os
import base64
imap_server = "imap.mail.ru"
mail = imaplib.IMAP4_SSL(imap_server)
mail.login(email_addr, email_pass)
mail.select('Inbox')
type, data = mail.search(None, "ALL")
mail_ids = data[0]
id_list = mail_ids.split()
last_id = id_list[-4]
email_message = ""
indexes = 0
typ, data = mail.fetch(last_id, '(RFC822)' )
raw_email = data[0][1]
raw_email_string = raw_email.decode('utf-8')
email_message = email.message_from_string(raw_email_string)
for part in email_message.walk():
        # this part comes from the snipped I don't understand yet... 
        if part.get_content_maintype() == 'multipart':
            continue
        if part.get('Content-Disposition') is None:
            continue
        fileName = part.get_filename()
        if bool(fileName):
            filePath = os.path.join('/django/backend/services/email', fileName)
            if not os.path.isfile(filePath) :
                fp = open(filePath, 'wb')
                fp.write(part.get_payload(decode=True))
                fp.close()
            subject = str(email_message).split("Subject: ", 1)[1].split("\nTo:", 1)[0]
            print('Downloaded "{file}" from email titled "{subject}"'.format(file=fileName, subject=subject))

         