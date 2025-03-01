# import requests

# # שליחה של בקשת GET לאתר
# response = requests.get('https://jsonplaceholder.typicode.com/posts')

# # בדיקה אם הבקשה הצליחה (קוד 200)
# if response.status_code == 200:
#     print("הבקשה הצליחה!")
#     print(response.json())  # הצגת התשובה ב-JSON
# else:
#     print(f"משהו השתבש, קוד סטטוס: {response.status_code}")
# from rich.console import Console
# from rich.table import Table

# console = Console()

# # הדפסת טקסט צבעוני ומודגש
# console.print("[bold green]שלום! זה הודעה בצבע ירוק ובולד![/bold green]")

# # יצירת טבלה יפה
# table = Table(title="דוגמה לטבלה עם rich")

# table.add_column("שם", justify="left", style="cyan", no_wrap=True)
# table.add_column("גיל", justify="center", style="magenta")
# table.add_column("עיר", justify="right", style="yellow")

# table.add_row("חיים", "25", "תל אביב")
# table.add_row("יוסי", "30", "חיפה")
# table.add_row("רותי", "22", "ירושלים")

# console.print(table)
