import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description1: {
            part1: 'Test 1',
            part2: 'Layout & Style'
          },
          description2: {
            part1: 'Test 2',
            part2: 'Layout & Style'
          },
          langSwitchEn: 'English',
          langSwitchTh: 'Thai',
          test1header: "Layout & Style",
          test2header: "Form",
          menu1: 'Move shape',
          menu2: 'Move position',
          formdesc: {
            title: "Title",
            firstName: "First Name",
            lastName: "Last Name",
            bDay: "Birthday",
            national: "Nationality",
            citizenId: "Citizen ID",
            gender: "Gender",
            pNumber: "Phone Number",
            visa: "Visa",
            eSalary: "Expected Salary",
          },
        }
      },
      th: {
        translation: {
          description1: {
            part1: 'แบบทดสอบที่ 1',
            part2: 'การจัดการหน้าเว็บ'
          },
          description2: {
            part1: 'แบบทดสอบที่ 2',
            part2: 'การจัดการหน้าฟอร์ม'
          },
          langSwitchEn: 'อังกฤษ',
          langSwitchTh: 'ไทย',
          test1header: "การจัดการหน้าเว็บ",
          test2header: "การจัดการหน้าฟอร์ม",
          menu1: 'เลื่อนรูปแบบ',
          menu2: 'เปลี่ยนตำแหน่ง',
          formdesc: {
            title: "คำนำหน้า",
            firstName: "ชื่อจริง",
            lastName: "นามสกุล",
            bDay: "วันเกิด",
            national: "สัญชาติ",
            citizenId: "เลขบัตรประชาชน",
            gender: "เพศ",
            pNumber: "หมายเลขโทรศัพท์มือถือ",
            visa: "หนังสือเดินทาง",
            eSalary: "เงินเดือนที่คาดหวัง",
          },
        }
      }
    }
  });

export default i18n;