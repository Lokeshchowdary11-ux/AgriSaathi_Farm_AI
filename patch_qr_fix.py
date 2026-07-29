import re

with open("src/components/AgriStore.tsx", "r") as f:
    content = f.read()

old_img = "`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=channamallulokesh@ybl%26pn=CHANNAMALLU%20LOKESH%26am=${cartTotal}%26cu=INR`"
new_img = "`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(\"upi://pay?pa=channamallulokesh@ybl&pn=CHANNAMALLU LOKESH&am=\" + cartTotal + \"&cu=INR\")}`"

content = content.replace(old_img, new_img)

with open("src/components/AgriStore.tsx", "w") as f:
    f.write(content)
