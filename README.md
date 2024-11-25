# Board app client

## ขั้นตอนการติดตั้ง
```
1. Clone repository
2. npm install
3. สร้างไฟล์ .env (env ตัวอย่างจะอยู่ในไฟล์ .env.example)
4. npm run dev
```

## การออกแบบสถาปัตยกรรมของแอปพลิเคชัน
 **ภาพรวม**
```
ประกอบด้วย 3 ส่วน:
Frontend: Next.js ใช้สำหรับแสดง UI
Backend: ใช้ Nestjs สำหรับสร้าง service และเชื่อมค่อฐานข้อมูล
Database: ใช้ฐานข้อมูล PostgreSQL
```

**ฟังก์ชั่นการทำงาน**
```
1. Sign In
ผู้ใช้งานเข้าสู่ระบบด้วย username
ไม่มีการเก็บ username ของ user ใน database 
เนื่องจากไม่มีระบบ authentication แต่จะเก็บ username ไว้ใน cookie แทน

2. Dashboard Home
แสดงรายการ blog ทั้งหมด
ค้นหา Blog ด้วย Blog name และ Blog type
คลิกที่ Blog เพื่อดูรายละเอียดและ Comment
สร้าง Blog ใหม่

3. Dashboard Our Blog
แสดงเฉพาะบล็อกที่ผู้ใช้งานสร้าง
แก้ไข Blog
ลบ Blog

4. Blog Detail Page
แสดงรายละเอียด Blog
ผู้ใช้งานสามารถเพิ่มความคิดเห็น

5. Sign Out
ผู้ใช้งานออกจากระบบ
```

## libraries/packages
```
 1. Material UI: ใช้ในการสร้าง ui และใช้งาน component
 2. Material Icon: ใช้งาน icon
 3. react-hook-form: สำหรับการจัดการฟิลด์ฟอร์ม
 4. axios: สำหรับทำงานกับ API
 5. yup: สำหรับการตรวจสอบข้อมูลในฟอร์ม
 6. tailwindcss: CSS Framework ใช้ออกแบบและจัดการ layout
 7.moment: สำหรับจัดการวันที่และเวลา
```
