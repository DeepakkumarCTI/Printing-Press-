import visitingCardsImage from "../assets/images/products/visiting-cards.jpg";
import brochuresImage from "../assets/images/products/brochures.jpg";
import bannersImage from "../assets/images/products/banners.jpg";
import tshirtsImage from "../assets/images/products/tshirts.jpg";
import mugsImage from "../assets/images/products/mugs.jpg";
import flyersImage from "../assets/images/products/flyers.jpg";
import postersImage from "../assets/images/products/posters.jpg";
import stickersImage from "../assets/images/products/stickers.jpg";
import letterheadsImage from "../assets/images/products/letterheads.jpg";
import invitationsImage from "../assets/images/products/invitations.jpg";
import calendarsImage from "../assets/images/products/calendars.jpg";
import notebooksImage from "../assets/images/products/notebooks.jpg";
import photoPrintsImage from "../assets/images/products/photo-prints.jpg";
import packagingBoxesImage from "../assets/images/products/packaging-boxes.jpg";
import envelopesImage from "../assets/images/products/envelopes.jpg";
import certificatesImage from "../assets/images/products/certificates.jpg";

export const initialProducts = [
  {
    id: "PR-101",
    name: "Premium Visiting Cards",
    category: "Business Printing",
    description:
      "Make a lasting first impression with professionally printed visiting cards and premium finishes.",
    price: 350,
    unit: "100 cards",
    image: visitingCardsImage,
    tag: "Popular",
    sizes: ["Standard 3.5 × 2 in", "Square 2.5 × 2.5 in"],
    materials: [
      "300 GSM Matte",
      "350 GSM Gloss",
      "Textured Premium",
    ],
    active: true,
  },
  {
    id: "PR-102",
    name: "Brochure Printing",
    category: "Business Printing",
    description:
      "Vibrant brochures for product launches, events, menus, and business promotions.",
    price: 1200,
    unit: "100 brochures",
    image: brochuresImage,
    tag: "Business Pick",
    sizes: ["A4", "A5", "Tri-fold A4"],
    materials: [
      "130 GSM Gloss",
      "170 GSM Matte",
      "250 GSM Art Card",
    ],
    active: true,
  },
  {
    id: "PR-103",
    name: "Promotional Banners",
    category: "Large Format",
    description:
      "High-impact banners for storefronts, promotions, exhibitions, and special events.",
    price: 180,
    unit: "per sq. ft.",
    image: bannersImage,
    tag: "High Impact",
    sizes: ["2 × 3 ft", "3 × 5 ft", "Custom Size"],
    materials: [
      "280 GSM Flex",
      "Premium Flex",
      "Fabric Banner",
    ],
    active: true,
  },
  {
    id: "PR-104",
    name: "Custom Printed T-shirt",
    category: "Apparel",
    description:
      "Bring your artwork to life on comfortable T-shirts for teams, events, and brands.",
    price: 299,
    unit: "per shirt",
    image: tshirtsImage,
    tag: "Customisable",
    sizes: ["S", "M", "L", "XL", "XXL"],
    materials: [
      "Cotton",
      "Poly-cotton",
      "Performance Fabric",
    ],
    active: true,
  },
  {
    id: "PR-105",
    name: "Personalised Ceramic Mug",
    category: "Custom Gifts",
    description:
      "A thoughtful personalised gift for birthdays, teams, celebrations, and business gifting.",
    price: 249,
    unit: "per mug",
    image: mugsImage,
    tag: "Gift Favourite",
    sizes: ["11 oz Standard"],
    materials: [
      "White Ceramic",
      "Magic Mug",
    ],
    active: true,
  },
  {
    id: "PR-106",
    name: "Flyer Printing",
    category: "Marketing Materials",
    description:
      "Promote your business, offers, events, and services with eye-catching printed flyers.",
    price: 450,
    unit: "100 flyers",
    image: flyersImage,
    tag: "Best Seller",
    sizes: ["A4", "A5", "A6"],
    materials: [
      "130 GSM Gloss",
      "170 GSM Matte",
      "Art Paper",
    ],
    active: true,
  },
  {
    id: "PR-107",
    name: "Custom Poster Printing",
    category: "Large Format",
    description:
      "Create vibrant posters for advertising, educational displays, promotions, and decorations.",
    price: 150,
    unit: "per poster",
    image: postersImage,
    tag: "Trending",
    sizes: ["A4", "A3", "A2", "A1"],
    materials: [
      "Gloss Paper",
      "Matte Paper",
      "Premium Photo Paper",
    ],
    active: true,
  },
  {
    id: "PR-108",
    name: "Custom Sticker Printing",
    category: "Custom Printing",
    description:
      "Personalised stickers for product labels, packaging, branding, and promotional campaigns.",
    price: 250,
    unit: "100 stickers",
    image: stickersImage,
    tag: "Custom Design",
    sizes: [
      "2 × 2 in",
      "3 × 3 in",
      "Custom Size",
    ],
    materials: [
      "Gloss Sticker",
      "Matte Sticker",
      "Waterproof Vinyl",
    ],
    active: true,
  },
  {
    id: "PR-109",
    name: "Corporate Letterheads",
    category: "Business Printing",
    description:
      "Professional letterheads featuring your company logo and branding for official communication.",
    price: 500,
    unit: "100 sheets",
    image: letterheadsImage,
    tag: "Corporate",
    sizes: ["A4", "A5"],
    materials: [
      "80 GSM Paper",
      "100 GSM Premium Paper",
      "Executive Bond Paper",
    ],
    active: true,
  },
  {
    id: "PR-110",
    name: "Invitation Card Printing",
    category: "Event Printing",
    description:
      "Elegant invitations for weddings, birthdays, engagements, and special celebrations.",
    price: 1500,
    unit: "100 cards",
    image: invitationsImage,
    tag: "Elegant Design",
    sizes: [
      "5 × 7 in",
      "5 × 5 in",
      "Custom Size",
    ],
    materials: [
      "Matte Card",
      "Textured Card",
      "Premium Art Card",
    ],
    active: true,
  },
  {
    id: "PR-111",
    name: "Custom Calendar Printing",
    category: "Business Printing",
    description:
      "Personalised calendars for homes, offices, corporate gifts, and year-round brand promotion.",
    price: 180,
    unit: "per calendar",
    image: calendarsImage,
    tag: "Seasonal Favourite",
    sizes: [
      "A4 Wall Calendar",
      "A3 Wall Calendar",
      "Desk Calendar",
    ],
    materials: [
      "Art Paper",
      "Gloss Paper",
      "Premium Card",
    ],
    active: true,
  },
  {
    id: "PR-112",
    name: "Custom Notebook Printing",
    category: "Office Supplies",
    description:
      "Branded notebooks for students, employees, meetings, corporate gifts, and everyday notes.",
    price: 120,
    unit: "per notebook",
    image: notebooksImage,
    tag: "Office Essential",
    sizes: [
      "A4",
      "A5",
      "A6",
    ],
    materials: [
      "Soft Cover",
      "Hard Cover",
      "Spiral Bound",
    ],
    active: true,
  },
  {
    id: "PR-113",
    name: "Premium Photo Prints",
    category: "Photo Printing",
    description:
      "Preserve your favourite memories with high-quality photo prints featuring rich colours and sharp details.",
    price: 25,
    unit: "per print",
    image: photoPrintsImage,
    tag: "Customer Favourite",
    sizes: [
      "4 × 6 in",
      "5 × 7 in",
      "8 × 10 in",
    ],
    materials: [
      "Gloss Photo Paper",
      "Matte Photo Paper",
      "Premium Photo Paper",
    ],
    active: true,
  },
  {
    id: "PR-114",
    name: "Custom Packaging Boxes",
    category: "Packaging",
    description:
      "Showcase your brand with custom-printed packaging boxes for retail products, gifts, and deliveries.",
    price: 35,
    unit: "per box",
    image: packagingBoxesImage,
    tag: "Branding Essential",
    sizes: [
      "Small",
      "Medium",
      "Large",
      "Custom Size",
    ],
    materials: [
      "Kraft Board",
      "Corrugated Board",
      "Premium Art Card",
    ],
    active: true,
  },
  {
    id: "PR-115",
    name: "Custom Printed Envelopes",
    category: "Business Printing",
    description:
      "Add a professional touch to business correspondence with branded, custom-printed envelopes.",
    price: 400,
    unit: "100 envelopes",
    image: envelopesImage,
    tag: "Professional",
    sizes: [
      "DL",
      "C5",
      "C4",
    ],
    materials: [
      "80 GSM Paper",
      "100 GSM Paper",
      "Premium Envelope Paper",
    ],
    active: true,
  },
  {
    id: "PR-116",
    name: "Certificate Printing",
    category: "Event Printing",
    description:
      "Print professional certificates for schools, colleges, workshops, training programmes, and corporate events.",
    price: 600,
    unit: "100 certificates",
    image: certificatesImage,
    tag: "Premium Finish",
    sizes: [
      "A4",
      "A5",
      "Custom Size",
    ],
    materials: [
      "170 GSM Matte",
      "250 GSM Art Card",
      "Textured Certificate Paper",
    ],
    active: true,
  },
];

export const categories = [
  "All",
  "Business Printing",
  "Large Format",
  "Apparel",
  "Custom Gifts",
  "Packaging",
];