import { Tour, Service, SiteSettings, TravelGuide } from '../types';
import { TRAVEL_GUIDES } from './seoData';

export const DEFAULT_TRAVEL_GUIDES: TravelGuide[] = TRAVEL_GUIDES;

export const DEFAULT_SETTINGS: SiteSettings = {
  "brandName": "InGeorgiaTours",
  "tagline": "აღმოაჩინე საქართველოს გამორჩეული კუთხეები",
  "taglineEn": "Discover Georgia’s Most Breathtaking Destinations",
  "whatsappNumber": "995595017390",
  "displayPhone": "+995 595 01 73 90",
  "phone": "+995 595 01 73 90",
  "email": "info.ingeorgiatours@gmail.com",
  "location": "ქუთაისი, საქართველო",
  "locationEn": "Kutaisi, Georgia",
  "address": "ქუთაისი, საქართველო",
  "workHours": "ყოველდღე: 09:00 - 21:00",
  "workingHours": "ყოველდღე: 09:00 - 21:00",
  "workHoursEn": "Everyday: 09:00 - 21:00 (GMT+4)",
  "priceDisclaimer": "* საიტზე მითითებული ფასები არის საინფორმაციო ხასიათის. საბოლოო ღირებულება დამოკიდებულია ადამიანების რაოდენობაზე, სეზონსა და თქვენს მოთხოვნებზე.",
  "priceDisclaimerEn": "* All prices listed on this website are indicative. The final quote depends on group size, travel season, and customized requirements.",
  "aboutText": "ჩვენ გთავაზობთ ინდივიდუალურ და მცირე ჯგუფურ ტურებს მთელ საქართველოში, ასევე ტრანსფერებსა და გიდის მომსახურებას.",
  "aboutTextEn": "We provide tailor-made private tours, small group adventures, airport transfers, and certified guide services across Georgia.",
  "backgroundColor": "#F9F7F2",
  "heroCoverImage": "/images/covers/hero-cover.jpg",
  "heroCoverOverlayOpacity": 30,
  "heroTextColorMode": "light",
  "heroCoverPositionMobile": "32% 30%",
  "heroCoverPositionDesktop": "34% 51%",
  "toursCoverImage": "",
  "toursCoverOverlayOpacity": 35,
  "toursTextColorMode": "auto",
  "toursCoverPositionMobile": "50% 50%",
  "toursCoverPositionDesktop": "50% 50%",
  "servicesCoverImage": "/images/covers/services-cover.jpg",
  "servicesCoverOverlayOpacity": 35,
  "servicesTextColorMode": "light",
  "servicesCoverPositionMobile": "52% 31%",
  "servicesCoverPositionDesktop": "50% 15%",
  "guidesCoverImage": "",
  "guidesCoverOverlayOpacity": 35,
  "guidesTextColorMode": "auto",
  "guidesCoverPositionMobile": "50% 50%",
  "guidesCoverPositionDesktop": "50% 50%",
  "faqCoverImage": "",
  "faqCoverOverlayOpacity": 35,
  "faqTextColorMode": "auto",
  "faqCoverPositionMobile": "50% 50%",
  "faqCoverPositionDesktop": "50% 50%",
  "footerCoverImage": "",
  "footerCoverOverlayOpacity": 35,
  "footerTextColorMode": "auto",
  "footerCoverPositionMobile": "50% 50%",
  "footerCoverPositionDesktop": "50% 50%",
  "telegramEnabled": true,
  "telegramBotToken": "8804688673:AAENYbJOm1y8r4uIbFy8wZzmpW-UW5SZom4",
  "telegramChatId": "1655481200"
};

export const DEFAULT_TOURS: Tour[] = [
  {
    "id": "tour_1789537369367",
    "title": "ყაზბეგის ტური: მყინვარწვერი და გერგეტი",
    "titleEn": "Kazbegi & Mount Kazbek Tour",
    "region": "მცხეთა-მთიანეთი",
    "regionEn": "Mtskheta-Mtianeti",
    "duration": "3 დღე",
    "durationEn": "3 Day",
    "priceInfo": "120 ₾-დან / პერსონა",
    "priceInfoEn": "From 120 GEL / Person",
    "priceValue": 120,
    "category": "multi_day",
    "shortDescription": "აღმოაჩინეთ კავკასიონის დიდებულება! ყაზბეგის ტური მიგიყვანთ საქართველოს ერთ-ერთ ყველაზე შთამბეჭდავ ადგილას. საქართველოს სამხედრო გზის გავლით, ჟინვალის წყალსაცავის, ანანურისა და გუდაურის გადმოსახედის გავლით მიაღწევთ სტეფანწმინდას, სადაც ზღვის დონიდან 2170 მეტრზე აღმართული გერგეტის სამების ტაძარი და მყინვარწვერის თოვლიანი მწვერვალები დაუვიწყარ პანორამებს გთავაზობთ.",
    "shortDescriptionEn": "Discover the majestic Caucasus Mountains! A trip to Kazbegi takes you along the scenic Georgian Military Highway, stopping at Zhinvali Reservoir, Ananuri Fortress, and Gudauri viewpoint. At Stepantsminda, marvel at the iconic Gergeti Trinity Church perched at 2,170 meters against the awe-inspiring backdrop of snow-capped Mount Kazbek.",
    "highlights": [
      "ანანურის ციხე",
      "გერგეტის სამება",
      "ჟინვალის წყალსაცავი"
    ],
    "highlightsEn": [
      "Gergeti Church",
      "Annanuri Fortres",
      "Zhinvali Reservour"
    ],
    "included": [
      "კომფორტული ტრანსპორტი"
    ],
    "includedEn": [
      "Comfortable AC Transport"
    ],
    "imageUrl": "/images/tours/tour_1789537369367_cover.jpg",
    "gallery": [
      "/images/tours/tour_1789537369367_gal_0.jpg",
      "/images/tours/tour_1789537369367_gal_1.jpg",
      "/images/tours/tour_1789537369367_gal_2.jpg",
      "/images/tours/tour_1789537369367_gal_3.jpg",
      "/images/tours/tour_1789537369367_gal_4.jpg"
    ],
    "featured": false,
    "isActive": true
  },
  {
    "id": "tour_1789466378332",
    "title": "პრომეთესა და სათაფლიის მღვიმეები",
    "titleEn": "Prometheus & Sataplia Caves",
    "region": "იმერეთი",
    "regionEn": "Imereti",
    "duration": "1 დღე",
    "durationEn": "1 Day",
    "priceInfo": "60₾-დან / პერსონა",
    "priceInfoEn": "From 60GEL / Person",
    "priceValue": 60,
    "category": "day_tour",
    "shortDescription": "იმოგზაურეთ დროში და გამოიკვლიეთ საქართველოს ყველაზე შთამბეჭდავი მიწისქვეშა სამყარო. პრომეთეს მღვიმე თავისი განათებული სტალაგმიტებითა და ნავით გასასვლელი მიწისქვეშა მდინარით ზღაპრულ შთაბეჭდილებას ტოვებს. ხოლო სათაფლიის ნაკრძალში შეგიძლიათ იხილოთ დინოზავრების ნამდვილი ნაკვალევი, გაიაროთ მინის გადმოსახედზე და ისიამოვნოთ უძველესი კოლხური ტყის სიმშვიდით.",
    "shortDescriptionEn": "Step back in time and explore Georgia’s captivating underground realms. Prometheus Cave mesmerizes visitors with colorful stalactites and boat trips along subterranean rivers. Nearby, Sataplia Nature Reserve lets you walk in the footsteps of prehistoric dinosaurs, tread across a glass-bottomed lookout, and wander through ancient Colchic forests.",
    "highlights": [],
    "included": [
      "კომფორტული ტრანსპორტი"
    ],
    "includedEn": [
      "Comfortable AC Transport"
    ],
    "imageUrl": "/images/tours/tour_1789466378332_cover.jpg",
    "gallery": [
      "/images/tours/tour_1789466378332_gal_0.jpg",
      "/images/tours/tour_1789466378332_gal_1.jpg",
      "/images/tours/tour_1789466378332_gal_2.jpg",
      "/images/tours/tour_1789466378332_gal_3.jpg",
      "/images/tours/tour_1789466378332_gal_4.jpg"
    ],
    "featured": false,
    "isActive": true
  },
  {
    "id": "tour_1789463895372",
    "title": "მარტვილისა და ოკაცეს კანიონები",
    "titleEn": "Martvili & Okatse Canyons",
    "region": "სამეგრელო",
    "regionEn": "Samegrelo",
    "duration": "1 დღე",
    "durationEn": "1 Day",
    "priceInfo": "80₾-დან / პერსონა",
    "priceInfoEn": "From 80 GEL / Person",
    "priceValue": 80,
    "category": "day_tour",
    "shortDescription": "აღმოაჩინეთ დასავლეთ საქართველოს ულამაზესი ბუნების საოცრებები! მარტვილის კანიონი გთავაზობთ დაუვიწყარ გასეირნებას ნავით ზურმუხტისფერ მდინარე აბაშაზე, სადაც ჩანჩქერები და მწვანეში ჩაფლული კლდეები ჯადოსნურ გარემოს ქმნის. ექსტრემისა და განსხვავებული ხედების მოყვარულთათვის კი ოკაცეს კანიონის დაკიდული ხიდი ნამდვილი აღმოჩენაა — გაისეირნეთ უფსკრულის თავზე და დატკბით იმერეთის უსასრულო პანორამებით.",
    "shortDescriptionEn": "Discover the natural wonders of Western Georgia! Martvili Canyon offers an unforgettable boat ride through emerald waters surrounded by lush waterfalls and dramatic cliffs. For adventure seekers, Okatse Canyon features a thrilling hanging cliffwalk high above the ravine, providing breathtaking panoramic views of Imereti's pristine wilderness.",
    "highlights": [],
    "highlightsEn": [
      "Emerald river boat rides",
      "Illuminated underground stalactite formations"
    ],
    "included": [
      "კომფორტული ტრანსპორტი"
    ],
    "includedEn": [
      "Comfortable AC Transport"
    ],
    "imageUrl": "/images/tours/tour_1789463895372_cover.jpg",
    "gallery": [
      "/images/tours/tour_1789463895372_gal_0.jpg",
      "/images/tours/tour_1789463895372_gal_1.jpg",
      "/images/tours/tour_1789463895372_gal_2.jpg",
      "/images/tours/tour_1789463895372_gal_3.jpg"
    ],
    "featured": false,
    "isActive": true
  }
];

export const DEFAULT_SERVICES: Service[] = [
  {
    "id": "srv_1788020997081",
    "title": "Airport Transfer",
    "titleEn": "Airport Transfer from Kutaisi Airport to Kutaisi city center",
    "category": "transfer",
    "priceInfo": "80 ₾-დან",
    "priceInfoEn": "From 70 GEL /",
    "shortDescription": "",
    "features": [
      "კომფორტული ავტომობილი",
      "პუნქტუალური მომსახურება"
    ],
    "featuresEn": [
      "Comfortable car",
      "Punctual Service"
    ],
    "iconName": "plane",
    "imageUrl": "/images/services/srv_1788020997081_cover.jpg",
    "isActive": true
  }
];
