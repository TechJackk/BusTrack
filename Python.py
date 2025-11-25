import cv2
import os

# Create dictionaries for ASCII mapping
d = {}
c = {}
for i in range(255):
    d[chr(i)] = i
    c[i] = chr(i)

# ======== READ IMAGE =========
# 👉 CHANGE THIS PATH TO WHERE YOUR IMAGE IS SAVED
image_path = r"C:\Users\TCS\Desktop\img.jpg"

x = cv2.imread(image_path)
if x is None:
    print("Error: Image not found. Check your path.")
    exit()

rows = x.shape[0]
cols = x.shape[1]
print("Image dimensions:", rows, cols)

# ======== INPUTS =========
key = input("Enter Security Key: ")
text = input("Enter text to hide: ")

kl = 0
z = 0
n = 0
m = 0
l = len(text)

# ======== ENCRYPT & HIDE TEXT =========
for i in range(l):
    x[n, m, z] = d[text[i]] ^ d[key[kl]]
    n += 1
    m += 1
    m = (m + 1) % 3
    kl = (kl + 1) % len(key)

# ======== SAVE ENCRYPTED IMAGE =========
cv2.imwrite("encrypted_img.jpg", x)
os.startfile("encrypted_img.jpg")
print("\nData Hiding in Image completed successfully.")

# ======== EXTRACT OPTION =========
choice = int(input("\nEnter 1 to extract data from image: "))
if choice == 1:
    key1 = input("Re-enter Security Key to extract: ")

    decrypt = ""
    kl = 0
    z = 0
    n = 0
    m = 0

    if key == key1:
        for i in range(l):
            decrypt += c[x[n, m, z] ^ d[key[kl]]]
            n += 1
            m += 1
            m = (m + 1) % 3
            kl = (kl + 1) % len(key)

        print("\nEncrypted text was:", decrypt)

    else:
        print("Key does not match ❌")
else:
    print("Thank you. Exiting.")
