import requests

url = 'http://127.0.0.1:8000'  # כאן תכניס את ה-URL של השרת שלך
# הנתיב לקובץ ה-PDF שאתה רוצה לשלוח
file_path = 'C:/Users/chaim/Desktop/PII-detection-app/backend/Yaakov/fee.pdf'

# פותחים את הקובץ ב-'rb' (קריאה בינארית)
with open(file_path, 'rb') as f:
    files = {'files': (file_path, f, 'application/pdf')}
    print(files.values)

    # שולחים את הבקשה עם ה-PDF
    response = requests.post(f"{url}/pii/upload", files=files)
    print(response.text)

# בודקים אם הבקשה הצליחה
# if response.status_code == 200:
#     print("הקובץ נשלח בהצלחה!")
#     print(response)
# else:
#     print(f"משהו השתבש! קוד סטטוס: {response.status_code}")
