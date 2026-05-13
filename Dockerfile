# অবশ্যই node:20 বা তার বেশি ব্যবহার করুন
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# প্রোডাকশনের জন্য নিচের কমান্ডটি বেশি ভালো
RUN npm install

COPY . .

# আপনার অ্যাপ যদি অন্য পোর্টে চলে তবে সেটি এখানে দিন (Back4App এর জন্য ৮০৮০ ভালো)
EXPOSE 8080

CMD ["node", "index.js"]