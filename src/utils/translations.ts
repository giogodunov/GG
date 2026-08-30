import { Language } from '../types';

export interface Translations {
  // Navigation
  navTours: string;
  navServices: string;
  navGuides: string;
  navFaq: string;
  navAbout: string;
  navContact: string;
  navBook: string;
  navAdmin: string;
  navWhatsApp: string;

  // Hero Section
  heroBadge: string;
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubtext: string;
  heroSearchPlaceholder: string;
  heroAllTours: string;
  heroDayTours: string;
  heroMultiDay: string;
  heroWine: string;
  heroAdventure: string;
  heroCultural: string;
  heroDirectWhatsApp: string;
  heroBookNow: string;

  // Tours Section
  toursTitle: string;
  toursSubtitle: string;
  toursCount: string;
  noToursFound: string;
  clearFilter: string;
  featuredBadge: string;
  fromPrice: string;
  indicativePrice: string;
  viewDetails: string;
  bookTour: string;
  quickBook: string;
  durationLabel: string;
  highlightsLabel: string;
  includedLabel: string;
  notIncludedLabel: string;
  itineraryLabel: string;

  // Tour Details Modal
  modalClose: string;
  routeHighlights: string;
  whatIsIncluded: string;
  whatIsNotIncluded: string;
  directWhatsAppInquiry: string;
  sendBookingRequest: string;
  priceNote: string;

  // Services Section
  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesQuickAdd: string;
  servicesQuickAddSub: string;
  bookService: string;
  freeConsultation: string;

  // About & Pricing Section
  aboutBadge: string;
  aboutTitle: string;
  aboutSubtext: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  customTourTitle: string;
  customTourDesc: string;
  workHoursLabel: string;

  // Contact & Footer
  contactBadge: string;
  contactQuickActions: string;
  contactServicesList: string;
  contactSchedule: string;
  contactCopyright: string;
  adminPanelBtn: string;
  pricesInformational: string;

  // Booking Modal
  formValidationName: string;
  formValidationPhone: string;
  formModalBadge: string;
  formModalTitle: string;
  formSuccessTitle: string;
  formSuccessSubtitle: string;
  formInterestedIn: string;
  formOptionTour: string;
  formOptionService: string;
  formOptionCustom: string;
  formSelectTour: string;
  formSelectService: string;
  formTopicSubject: string;
  formFullName: string;
  formPhone: string;
  formDesiredDate: string;
  formTravelersCount: string;
  formPreferredContact: string;
  formOptionPhoneCall: string;
  formWishesNotes: string;
  formWishesPlaceholder: string;
  formSubmitBtn: string;
  formDirectWhatsAppClarify: string;

  bookingModalTitle: string;
  bookingModalSubtitle: string;
  bookingForLabel: string;
  fullNameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  dateLabel: string;
  peopleCountLabel: string;
  preferredContactLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  submitWhatsAppBtn: string;
  submitFormBtn: string;
  successMessage: string;
  validationError: string;

  // Admin Panel
  adminTitle: string;
  adminTabServices: string;
  adminTabTours: string;
  adminTabInquiries: string;
  adminTabSettings: string;
  adminAddTour: string;
  adminAddService: string;
  adminEdit: string;
  adminDelete: string;
  adminSave: string;
  adminCancel: string;
  adminStatusNew: string;
  adminStatusContacted: string;
  adminStatusConfirmed: string;
  adminStatusCancelled: string;

  // Floating button
  floatingWhatsAppText: string;
}

export const translations: Record<Language, Translations> = {
  ka: {
    navTours: 'ტურები',
    navServices: 'სერვისები',
    navGuides: 'გზამკვლევი',
    navFaq: 'კითხვა-პასუხი',
    navAbout: 'პირობები და ფასები',
    navContact: 'კონტაქტი',
    navBook: 'დაჯავშნა',
    navAdmin: 'სამართავი პანელი',
    navWhatsApp: 'WhatsApp ჩათი',

    heroBadge: 'პერსონალიზებული მოგზაურობა',
    heroHeadline: 'აღმოაჩინე',
    heroHeadlineHighlight: 'საქართველო',
    heroSubtext: 'ინდივიდუალური ტურები და პრემიუმ სერვისები თქვენი კომფორტისთვის. დაჯავშნა და კონსულტაცია WhatsApp-ით ან ფორმით.',
    heroSearchPlaceholder: 'მოძებნე ტური (მაგ: ყაზბეგი, კახეთი, სვანეთი...)',
    heroAllTours: 'ყველა ტური',
    heroDayTours: '1-დღიანი',
    heroMultiDay: 'მრავალდღიანი',
    heroWine: 'ღვინის ტურები',
    heroAdventure: 'სათავგადასავლო',
    heroCultural: 'კულტურული',
    heroDirectWhatsApp: 'WhatsApp კონსულტაცია',
    heroBookNow: 'დაჯავშნის მოთხოვნა',

    toursTitle: 'რჩეული მარშრუტები',
    toursSubtitle: 'საქართველოს ულამაზესი კუთხეები — მორგებული თქვენს ინტერესებზე.',
    toursCount: 'სულ ხელმისაწვდომია',
    noToursFound: 'მითითებული პარამეტრებით ტური ვერ მოიძებნა.',
    clearFilter: 'ფილტრის გასუფთავება',
    featuredBadge: 'რჩეული',
    fromPrice: '-დან',
    indicativePrice: 'საინფორმაციო ფასი',
    viewDetails: 'დეტალები',
    bookTour: 'დაჯავშნა',
    quickBook: 'სწრაფი ჯავშანი',
    durationLabel: 'ხანგრძლივობა',
    highlightsLabel: 'მარშრუტი',
    includedLabel: 'ფასში შედის',
    notIncludedLabel: 'ფასში არ შედის',
    itineraryLabel: 'დეტალური პროგრამა',

    modalClose: 'დახურვა',
    routeHighlights: 'მარშრუტის მთავარი პუნქტები',
    whatIsIncluded: 'ღირებულებაში შედის',
    whatIsNotIncluded: 'ღირებულებაში არ შედის',
    directWhatsAppInquiry: 'WhatsApp-ით შეკვეთა',
    sendBookingRequest: 'ფორმით დაჯავშნა',
    priceNote: '* ფასები არის საინფორმაციო და ზუსტდება ინდივიდუალურად ჯგუფის რაოდენობის მიხედვით.',

    servicesBadge: 'დამატებითი მომსახურებები',
    servicesTitle: 'ტრანსფერი, გიდი & სერვისები',
    servicesSubtitle: 'სრული კომფორტი თქვენი მოგზაურობის ყველა ეტაპზე.',
    servicesQuickAdd: 'სწრაფი წვდომა',
    servicesQuickAddSub: 'დაამატეთ ახალი სერვისი',
    bookService: 'სერვისის დაჯავშნა',
    freeConsultation: 'უფასო კონსულტაცია',

    aboutBadge: 'გამჭვირვალე პირობები',
    aboutTitle: 'როგორ მუშაობს დაჯავშნა და ფასები?',
    aboutSubtext: 'საიტზე მითითებული ფასები არის საინფორმაციო ხასიათის, რაც გაძლევთ საშუალებას წინასწარ განსაზღვროთ სავარაუდო ბიუჯეტი.',
    step1Title: 'არჩევა',
    step1Desc: 'შეარჩიეთ სასურველი ტური ან სერვისი (ტრანსფერი, გიდი, ავტომობილი).',
    step2Title: 'კავშირი',
    step2Desc: 'მოგვწერეთ WhatsApp-ში ან დატოვეთ სწრაფი საკონტაქტო ფორმა.',
    step3Title: 'დადასტურება',
    step3Desc: 'დავაზუსტებთ დეტალებს, თარიღს და დავადასტურებთ თქვენს ჯავშანს.',
    customTourTitle: 'ინდივიდუალური ტური',
    customTourDesc: 'ჩვენ მზად ვართ შეგიდგინოთ პერსონალური მარშრუტი თქვენი სურვილებისა და ბიუჯეტის მიხედვით.',
    workHoursLabel: 'სამუშაო საათები',

    contactBadge: 'დაგვიკავშირდით',
    contactQuickActions: 'სწრაფი კავშირი',
    contactServicesList: 'ჩვენი სერვისები',
    contactSchedule: 'სამუშაო გრაფიკი',
    contactCopyright: 'InGeorgiaTours — პერსონალიზებული მოგზაურობა',
    adminPanelBtn: 'სამართავი პანელი',
    pricesInformational: 'ფასები არის საინფორმაციო ხასიათის',

    
    formValidationName: 'სახელის მითითება სავალდებულოა.',
    formValidationPhone: 'ტელეფონის ნომრის მითითება სავალდებულოა.',
    formModalBadge: 'დაჯავშნა',
    formModalTitle: 'მოთხოვნის გაგზავნა',
    formSuccessTitle: 'წარმატებით გაიგზავნა',
    formSuccessSubtitle: 'ჩვენი გუნდი მალე დაგიკავშირდებათ დეტალების დასაზუსტებლად.',
    formInterestedIn: 'რითი ხართ დაინტერესებული?',
    formOptionTour: 'ტურები',
    formOptionService: 'სერვისები',
    formOptionCustom: 'ინდივიდუალური მოთხოვნა',
    formSelectTour: 'აირჩიეთ ტური',
    formSelectService: 'აირჩიეთ სერვისი',
    formTopicSubject: 'მოთხოვნის თემა',
    formFullName: 'სახელი და გვარი',
    formPhone: 'ტელეფონის ნომერი',
    formDesiredDate: 'სასურველი თარიღი',
    formTravelersCount: 'ადამიანების რაოდენობა',
    formPreferredContact: 'კავშირის სასურველი მეთოდი',
    formOptionPhoneCall: 'სატელეფონო ზარი',
    formWishesNotes: 'სურვილები / კომენტარი',
    formWishesPlaceholder: 'მოგვწერეთ ნებისმიერი სპეციალური მოთხოვნა...',
    formSubmitBtn: 'მოთხოვნის გაგზავნა',
    formDirectWhatsAppClarify: 'ან მოგვწერეთ პირდაპირ',

    bookingModalTitle: 'დაჯავშნის მოთხოვნა',
    bookingModalSubtitle: 'შეავსეთ ფორმა ან გადადით პირდაპირ WhatsApp ჩატში ოპერატორთან დასაკავშირებლად.',
    bookingForLabel: 'არჩეული ობიექტი',
    fullNameLabel: 'თქვენი სახელი და გვარი *',
    phoneLabel: 'ტელეფონის ნომერი *',
    emailLabel: 'ელ-ფოსტა (არასავალდებულო)',
    dateLabel: 'სასურველი თარიღი',
    peopleCountLabel: 'ადამიანების რაოდენობა',
    preferredContactLabel: 'სასურველი საკონტაქტო არხი',
    notesLabel: 'დამატებითი სურვილები / კომენტარი',
    notesPlaceholder: 'მოგვწერეთ ნებისმიერი სპეციალური მოთხოვნა...',
    submitWhatsAppBtn: 'გაგზავნა WhatsApp-ით',
    submitFormBtn: 'მოთხოვნის გაგზავნა',
    successMessage: 'თქვენი მოთხოვნა წარმატებით გაიგზავნა! მალე დაგიკავშირდებით.',
    validationError: 'გთხოვთ შეავსოთ სავალდებულო ველები.',

    adminTitle: 'ადმინისტრატორის პანელი',
    adminTabServices: 'სერვისების მართვა',
    adminTabTours: 'ტურების მართვა',
    adminTabInquiries: 'ჯავშნები / მოთხოვნები',
    adminTabSettings: 'პარამეტრები & WhatsApp',
    adminAddTour: 'ახალი ტურის დამატება',
    adminAddService: 'ახალი სერვისის დამატება',
    adminEdit: 'რედაქტირება',
    adminDelete: 'წაშლა',
    adminSave: 'შენახვა',
    adminCancel: 'გაუქმება',
    adminStatusNew: 'ახალი',
    adminStatusContacted: 'დაკავშირებული',
    adminStatusConfirmed: 'დადასტურებული',
    adminStatusCancelled: 'გაუქმებული',

    floatingWhatsAppText: 'გჭირდებათ დახმარება? მოგვწერეთ WhatsApp-ზე'
  },
  en: {
    navTours: 'Tours',
    navServices: 'Services',
    navGuides: 'Travel Guides',
    navFaq: 'FAQ',
    navAbout: 'Pricing & How it Works',
    navContact: 'Contact',
    navBook: 'Book Now',
    navAdmin: 'Admin Panel',
    navWhatsApp: 'WhatsApp Chat',

    heroBadge: 'Tailored Travel Experiences',
    heroHeadline: 'Discover',
    heroHeadlineHighlight: 'Georgia',
    heroSubtext: 'Customized private tours and premium travel services tailored to your comfort. Instant booking via WhatsApp or online request.',
    heroSearchPlaceholder: 'Search tours (e.g. Kazbegi, Kakheti, Svaneti...)',
    heroAllTours: 'All Tours',
    heroDayTours: 'Day Tours',
    heroMultiDay: 'Multi-Day',
    heroWine: 'Wine Tours',
    heroAdventure: 'Adventure',
    heroCultural: 'Cultural',
    heroDirectWhatsApp: 'WhatsApp Consultation',
    heroBookNow: 'Request Booking',

    toursTitle: 'Featured Itineraries',
    toursSubtitle: 'The most breathtaking destinations in Georgia — crafted around your preferences.',
    toursCount: 'Total available',
    noToursFound: 'No tours found matching your search criteria.',
    clearFilter: 'Clear Filter',
    featuredBadge: 'Featured',
    fromPrice: 'From',
    indicativePrice: 'Indicative Price',
    viewDetails: 'View Details',
    bookTour: 'Book Tour',
    quickBook: 'Quick Book',
    durationLabel: 'Duration',
    highlightsLabel: 'Highlights',
    includedLabel: 'What\'s Included',
    notIncludedLabel: 'Not Included',
    itineraryLabel: 'Detailed Itinerary',

    modalClose: 'Close',
    routeHighlights: 'Route Highlights',
    whatIsIncluded: 'Price Includes',
    whatIsNotIncluded: 'Price Excludes',
    directWhatsAppInquiry: 'Order via WhatsApp',
    sendBookingRequest: 'Send Booking Form',
    priceNote: '* Prices are indicative and finalized based on your group size and season.',

    servicesBadge: 'Additional Services',
    servicesTitle: 'Transfers, Guides & Services',
    servicesSubtitle: 'Complete comfort at every stage of your trip in Georgia.',
    servicesQuickAdd: 'Quick Access',
    servicesQuickAddSub: 'Add New Service',
    bookService: 'Book Service',
    freeConsultation: 'Free Consultation',

    aboutBadge: 'Transparent Terms',
    aboutTitle: 'How Booking & Pricing Works',
    aboutSubtext: 'All listed prices are indicative, allowing you to estimate your travel budget easily and transparently.',
    step1Title: 'Select',
    step1Desc: 'Choose your desired tour or travel service (airport transfer, guide, private vehicle).',
    step2Title: 'Contact',
    step2Desc: 'Send a quick WhatsApp message or fill out our straightforward booking form.',
    step3Title: 'Confirm',
    step3Desc: 'We coordinate the final details, dates, and confirm your personalized booking.',
    customTourTitle: 'Tailor-Made Tour',
    customTourDesc: 'We are delighted to design a personalized itinerary tailored to your exact dates, interests, and budget.',
    workHoursLabel: 'Working Hours',

    contactBadge: 'Contact Us',
    contactQuickActions: 'Quick Contact',
    contactServicesList: 'Our Services',
    contactSchedule: 'Operating Hours',
    contactCopyright: 'InGeorgiaTours — Personalized Travel in Georgia',
    adminPanelBtn: 'Admin Dashboard',
    pricesInformational: 'Prices are for informational purposes',

    
    formValidationName: 'Name is required.',
    formValidationPhone: 'Phone number is required.',
    formModalBadge: 'Booking',
    formModalTitle: 'Send Request',
    formSuccessTitle: 'Successfully Sent',
    formSuccessSubtitle: 'Our team will contact you shortly with more details.',
    formInterestedIn: 'What are you interested in?',
    formOptionTour: 'Tours',
    formOptionService: 'Services',
    formOptionCustom: 'Custom Request',
    formSelectTour: 'Select Tour',
    formSelectService: 'Select Service',
    formTopicSubject: 'Request Subject',
    formFullName: 'Full Name',
    formPhone: 'Phone Number',
    formDesiredDate: 'Preferred Date',
    formTravelersCount: 'Number of Travelers',
    formPreferredContact: 'Preferred Contact Method',
    formOptionPhoneCall: 'Phone Call',
    formWishesNotes: 'Wishes / Comments',
    formWishesPlaceholder: 'Write any specific requests...',
    formSubmitBtn: 'Submit Request',
    formDirectWhatsAppClarify: 'or contact us directly on',

    bookingModalTitle: 'Booking Request',
    bookingModalSubtitle: 'Fill out this quick form or reach out directly via WhatsApp for immediate assistance.',
    bookingForLabel: 'Selected Item',
    fullNameLabel: 'Full Name *',
    phoneLabel: 'Phone Number (with country code) *',
    emailLabel: 'Email Address (optional)',
    dateLabel: 'Preferred Date',
    peopleCountLabel: 'Number of Travelers',
    preferredContactLabel: 'Preferred Contact Method',
    notesLabel: 'Special Requests / Notes',
    notesPlaceholder: 'Write any specific requests or questions...',
    submitWhatsAppBtn: 'Submit via WhatsApp',
    submitFormBtn: 'Send Booking Request',
    successMessage: 'Your inquiry has been submitted successfully! We will contact you shortly.',
    validationError: 'Please fill in all required fields.',

    adminTitle: 'Administrator Dashboard',
    adminTabServices: 'Manage Services',
    adminTabTours: 'Manage Tours',
    adminTabInquiries: 'Inquiries & Bookings',
    adminTabSettings: 'Settings & WhatsApp',
    adminAddTour: 'Add New Tour',
    adminAddService: 'Add New Service',
    adminEdit: 'Edit',
    adminDelete: 'Delete',
    adminSave: 'Save Changes',
    adminCancel: 'Cancel',
    adminStatusNew: 'New',
    adminStatusContacted: 'Contacted',
    adminStatusConfirmed: 'Confirmed',
    adminStatusCancelled: 'Cancelled',

    floatingWhatsAppText: 'Need assistance? Chat on WhatsApp'
  }
};
