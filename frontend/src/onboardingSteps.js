import {
    UserRound, Home, KeyRound, Users, Sparkles, Building, PartyPopper,
    Car, Bike, Footprints, TrainFront, Accessibility, FileText, PersonStanding,
    UserPlus, Baby, Dog, CarTaxiFront, BriefcaseBusiness, GraduationCap,
    Laptop, Heart, Search, Sun, CreditCard, Banknote, Hospital, StickyNote,
    Wrench, Lightbulb, Apple, Stethoscope, PawPrint, LibraryBig, PiggyBank,
    Gamepad2, Zap, Droplet, Flame, Globe, Smartphone, Trash, Tv, ShoppingCart,
    Coffee, HandPlatter, Utensils, Glasses, Smile, Brain, BookHeart, PillBottle,
    Bandage, Bed, Ear, Wind, Pill, Shirt, Scissors, Dumbbell, Hand,
    ShieldCheck, Tablets, Shapes, PackageOpen, Book, PencilLine,
    School, Backpack, University, Video, Palette, Plane, RotateCcw,
    Gift, Package, HeartPlus, TriangleAlert, HandCoins, Umbrella,
    Wallet, Sprout, Leaf, MirrorRound, BrushCleaning, ParkingCircle
} from "lucide-react";


// ---------------------------------------------------------------------------
// STEP SHAPES
//
// A step is one of:
//   - { type: "text", ... }            
////    single text input
//   - { blocks: [...] }                 
////    one or more selectable-option questions in one card                                   
//   - { id: "complete", ... }           
////    the final screen
//
// A block is one selectable question:
//   - key          
////    where its answer is stored in `answers`
//   - selectMode   
////    "single" or "multi"
//   - layout       
////    "list" (horizontal rows)
////    "grid" (vertical cards, 2 columns)
////    "list-grid" (horizontal rows, 2 columns)
//   - options      
////    [{ value, label, icon, text? }]
//   - showIf       
////    optional (answers) => boolean: hides the whole block
////    unless the condition is met (example mortgage question
////    only shown if they said they own their home)
//
// A step can also have `blurb: { title, text, icon }`
// the purple callout shown at the top of each category-detail screen.
// ---------------------------------------------------------------------------

// maps a base category value (from the "base-category" step) to the id of
// the detail step that should follow if that category was selected
const categoryStepMap = {
    utilities: "utilities",
    transportation: "transportation",
    food: "food",
    medical: "healthcare",
    pet: "pets",
    personal: "personal-needs",
    child: "child-care",
    education: "education",
    savings: "savings",
    equipment: "special-equipment",
    entertainment: "entertainment",
    other: "miscellaneous",
};

// steps that are always shown before the category detail screens
const coreSteps = [
    // your name
    {
        id: "name",
        subheader: "Personalization",
        header: "Hi there! What's your name?",
        text: "We'll use it to make things feel a little more personal.",
        // input information
        type: "text",
        label: "Your name",
        icon: UserRound,
        placeholder: "Lucy",
    },
    // what are your goals
    {
        id: "goals",
        subheader: "Personalization",
        header: "What are you looking for?",
        text: "Everyone approaches budgeting differently. Select all that apply and we'll use this to understand you better.",
        blocks: [
            {
                key: "goals",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "simple", label: "I want a simple way to budget" },
                    { value: "organized", label: "I want to feel more organized" },
                    { value: "overwhelmed", label: "I get overwhelmed by finances" },
                    { value: "forget", label: "I forget to track my expenses" },
                    { value: "habits", label: "I want better spending habits" },
                ],
            },
        ],
    },
    // your household
    {
        id: "household",
        subheader: "Home",
        header: "Who's in your household?",
        text: "Select all that apply.",
        blocks: [
            {
                key: "household",
                selectMode: "multi",
                layout: "grid",
                options: [
                    { value: "myself", label: "Myself", icon: PersonStanding },
                    { value: "partner", label: "Partner", icon: Users },
                    { value: "other-adults", label: "Other adults", icon: UserPlus },
                    { value: "children", label: "Children", icon: Baby },
                    { value: "pets", label: "Pets", icon: PawPrint },
                ],
            },
        ],
    },
    // living situation
    {
        id: "living-situation",
        subheader: "Home",
        header: "What's your current living situation?",
        blocks: [
            {
                key: "livingSituation",
                selectMode: "single",
                layout: "list",
                options: [
                    { value: "rent", label: "I rent", icon: Home },
                    { value: "own", label: "I own", icon: KeyRound },
                    { value: "family", label: "I live with family or friends", icon: Users },
                    { value: "other", label: "Something else", icon: Sparkles },
                ],
            },
            {
                key: "mortgage",
                label: "Do you have a mortgage?",
                selectMode: "single",
                layout: "list",
                // only shown if they said they own
                showIf: (answers) => answers.livingSituation === "own",
                options: [
                    { value: "yes", label: "Yes", icon: Building },
                    { value: "paid-off", label: "My property is paid off", icon: PartyPopper },
                ],
            },
        ],
    },
    // transportation
    {
        id: "transportation",
        subheader: "Transportation",
        header: "How do you normally get around?",
        text: "Select all that apply.",
        blocks: [
            {
                key: "transportMode",
                selectMode: "multi",
                layout: "grid",
                options: [
                    { value: "car", label: "Car", icon: Car },
                    { value: "bike", label: "Bike", icon: Bike },
                    { value: "walk", label: "Walk", icon: Footprints },
                    { value: "public-transit", label: "Public transit", icon: TrainFront },
                    { value: "ride-share", label: "Ride share", icon: CarTaxiFront },
                    { value: "wheelchair", label: "Wheelchair", icon: Accessibility },
                ],
            },
            {
                key: "carOwnership",
                label: "Do you own or lease your car?",
                selectMode: "single",
                layout: "list",
                // only relevant if "car" was actually picked above
                showIf: (answers) => (answers.transportMode || []).includes("car"),
                options: [
                    { value: "own", label: "Own", icon: KeyRound },
                    { value: "lease", label: "Lease", icon: FileText },
                    { value: "shared", label: "Shared vehicle", icon: Users },
                ],
            },
        ],
    },
    // income
    {
        id: "income",
        subheader: "Income",
        header: "What best describes your work situation?",
        text: "Select all that apply.",
        blocks: [
            {
                key: "income",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "working", label: "Working", icon: BriefcaseBusiness },
                    { value: "student", label: "Student", icon: GraduationCap },
                    { value: "freelance", label: "Freelance", icon: Laptop },
                    { value: "disability", label: "Disability", icon: Heart },
                    { value: "looking-for-work", label: "Looking for work", icon: Search },
                    { value: "retired", label: "Retired", icon: Sun },
                    { value: "something-else", label: "Something else", icon: Sparkles },
                ],
            },
        ],
    },
    // debt
    {
        id: "debt",
        subheader: "Debt",
        header: "Any payments you're currently working on?",
        text: "Select all that apply. No judgement here! This just helps us set up relevant categories.",
        blocks: [
            {
                key: "debt",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "credit-card", label: "Credit cards", icon: CreditCard },
                    { value: "student-loan", label: "Student loans", icon: GraduationCap },
                    { value: "personal-loan", label: "Personal loans", icon: Banknote },
                    { value: "medical-debt", label: "Medical debt", icon: Hospital },
                    { value: "something-else", label: "Something else", icon: StickyNote },
                    { value: "not-now", label: "Nope, not right now", icon: Sparkles },
                ],
            },
        ],
    },
    // create
    {
        id: "create-categories",
        subheader: "Create categories",
        header: "Let's build your budget.",
        text: "Select a path.",
        blocks: [
            {
                key: "path",
                selectMode: "single",
                layout: "grid",
                options: [
                    {
                        value: "help-me",
                        label: "Help me choose",
                        text: "We'll walk through categories together.",
                        icon: Wrench,
                    },
                    {
                        value: "do-it-myself",
                        label: "I'll do it myself",
                        text: "We'll provide you with basic suggestions.",
                        icon: Sparkles,
                    },
                ],
            },
        ],
    },
    // categories to pick
    {
        id: "base-category",
        subheader: "Categories",
        header: "What do you typically spend money on?",
        text: "Select all that apply. We'll set up items for each one.",
        blocks: [
            {
                key: "categories",
                selectMode: "multi",
                layout: "list-grid", 
                options: [
                    { value: "utilities", label: "Utilities", icon: Lightbulb },
                    { value: "transportation", label: "Transportation", icon: Car },
                    { value: "food", label: "Food", icon: Apple },
                    { value: "medical", label: "Medical needs", icon: Stethoscope },
                    { value: "pet", label: "Pet needs", icon: PawPrint },
                    { value: "personal", label: "Personal needs", icon: UserRound },
                    { value: "child", label: "Child care", icon: Baby },
                    { value: "education", label: "Education", icon: LibraryBig },
                    { value: "savings", label: "Savings", icon: PiggyBank },
                    { value: "equipment", label: "Special equipment", icon: Accessibility },
                    { value: "entertainment", label: "Entertainment", icon: Gamepad2 },
                    { value: "other", label: "Other", icon: Sparkles },
                ],
            },
        ],
    },
];

// unique categories users can pick to build their budget from
const categoryDetailSteps = [
    // utilities
    {
        id: "utilities",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Utilities", color: "amber",
            text: "What helps your home run smoothly", icon: Lightbulb },
        blocks: [
            {
                key: "utilitiesItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "electricity", label: "Electricity", icon: Zap },
                    { value: "water", label: "Water", icon: Droplet },
                    { value: "gas", label: "Gas", icon: Flame },
                    { value: "internet", label: "Internet", icon: Globe },
                    { value: "cell-phone", label: "Cell phone", icon: Smartphone },
                    { value: "trash", label: "Trash & recycling", icon: Trash },
                    { value: "cable", label: "Cable", icon: Tv },
                ],
            },
        ],
    },
    // transportation
    {
        id: "transportation",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Transportation", color: "slate",
            text: "Getting where you need to go.", icon: Car },
        blocks: [
            {
                key: "transportationItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "car-payment", label: "Car payment", icon: Car },
                    { value: "gas", label: "Gas", icon: Droplet },
                    { value: "car-insurance", label: "Car insurance", icon: ShieldCheck },
                    { value: "maintenance", label: "Maintenance & repairs", icon: Wrench },
                    { value: "public-transit-fare", label: "Public transit fare", icon: TrainFront },
                    { value: "parking", label: "Parking & tolls", icon: ParkingCircle },
                    { value: "rideshare", label: "Rideshare & taxis", icon: CarTaxiFront },
                ],
            },
        ],
    },
    // food
    {
        id: "food",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Food", color: "red",
             text: "Fuel for your body.", icon: Apple },
        blocks: [
            {
                key: "foodItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "groceries", label: "Groceries", icon: ShoppingCart },
                    { value: "drinks", label: "Drinks", icon: Coffee },
                    { value: "dining-out", label: "Dining out", icon: Utensils },
                    { value: "meal-delivery", label: "Meal delivery", icon: HandPlatter },
                ],
            },
        ],
    },
    // healthcare
    {
        id: "healthcare",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Healthcare", color: "blue",
            text: "Let's make space for your health and well being.", icon: Stethoscope },
        blocks: [
            {
                key: "healthcareItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "health-insurance", label: "Health insurance", icon: Stethoscope },
                    { value: "vision-insurance", label: "Vision insurance", icon: Glasses },
                    { value: "dental-insurance", label: "Dental insurance", icon: Smile },
                    { value: "medical-visits", label: "Medical visits", icon: Hospital },
                    { value: "therapy", label: "Therapy", icon: Brain },
                    { value: "ot-pt-speech-therapy", label: "OT / PT / Speech therapy", icon: BookHeart },
                    { value: "medications", label: "Medications", icon: PillBottle }, // fixed typo "Medictions"
                    { value: "medical-supplies", label: "Medical supplies", icon: Bandage },
                ],
            },
        ],
    },
    // special equipment
    {
        id: "special-equipment",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Special Equipment", color: "indigo",
            text: "Accessibility and support needs are important parts of everyday life.", icon: Accessibility },
        blocks: [
            {
                key: "specialEquipmentItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "wheelchair", label: "Wheelchair", icon: Accessibility },
                    { value: "hospital-bed", label: "Hospital bed", icon: Bed },
                    { value: "glasses", label: "Glasses", icon: Glasses },
                    { value: "hearing-aids", label: "Hearing aids", icon: Ear },
                    { value: "oxygen-equipment", label: "Oxygen equipment", icon: Wind },
                    { value: "medical-pumps", label: "Medical pumps", icon: Pill },
                ],
            },
        ],
    },
    // personal needs
    {
        id: "personal-needs",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Personal Needs", color: "rose",
            text: "The little things that help you feel comfortable, confident, and cared for.", icon: Lightbulb },
        blocks: [
            {
                key: "personalNeedsItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "clothing", label: "Clothing", icon: Shirt },
                    { value: "haircuts", label: "Haircuts", icon: Scissors },
                    { value: "gym", label: "Gym", icon: Dumbbell },
                    { value: "massages", label: "Massages", icon: Hand },
                    { value: "cosmetics", label: "Cosmetics", icon: MirrorRound },
                    { value: "nails", label: "Nails", icon: BrushCleaning },
                ],
            },
        ],
    },
    // pets
    {
        id: "pets",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Pets", color: "mauve",
            text: "Let's plan for the joy these little guys bring to your life.", icon: PawPrint },
        blocks: [
            {
                key: "petsItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "pet-food", label: "Pet food", icon: Dog },
                    { value: "pet-insurance", label: "Pet insurance", icon: ShieldCheck },
                    { value: "pet-medication", label: "Pet medication", icon: Tablets },
                    { value: "vet-visits", label: "Vet visits", icon: Hospital },
                    { value: "grooming", label: "Grooming", icon: Scissors }, 
                    { value: "pet-toys", label: "Pet toys", icon: Shapes },
                    { value: "pet-supplies", label: "Pet supplies", icon: PackageOpen },
                ],
            },
        ],
    },
    // education
    {
        id: "education",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Education", color: "teal",
            text: "Learning and growth are investments in your future.", icon: GraduationCap },
        blocks: [
            {
                key: "educationItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "tuition", label: "Tuition", icon: GraduationCap },
                    { value: "books", label: "Books", icon: Book },
                    { value: "tutoring", label: "Tutoring", icon: PencilLine },
                    { value: "certifications", label: "Certifications", icon: Laptop },
                    { value: "special-services", label: "Special services", icon: Sparkles },
                ],
            },
        ],
    },
    // child care
    {
        id: "child-care",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Child Care", color: "yellow",
            text: "Caring for others comes with a lot to think about.", icon: Baby },
        blocks: [
            {
                key: "childCareItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "child-care", label: "Child care", icon: Baby },
                    { value: "school-care", label: "Before / After school care", icon: School },
                    { value: "school-supplies", label: "School supplies", icon: Backpack },
                    { value: "activities", label: "Activities", icon: Shapes },
                    { value: "college-savings", label: "College savings", icon: University },
                ],
            },
        ],
    },
    // entertainment
    {
        id: "entertainment",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Entertainment", color: "lime",
            text: "Fun and rest matter too.", icon: Gamepad2 },
        blocks: [
            {
                key: "entertainmentItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "streaming-services", label: "Streaming services", icon: Tv },
                    { value: "movies", label: "Movies", icon: Video },
                    { value: "gaming", label: "Gaming", icon: Gamepad2 },
                    { value: "hobbies", label: "Hobbies", icon: Palette },
                    { value: "books", label: "Books", icon: Book },
                    { value: "vacations", label: "Vacations", icon: Plane },
                    { value: "subscriptions", label: "Subscriptions", icon: RotateCcw },
                ],
            },
        ],
    },
    // miscellaneous
    {
        id: "miscellaneous",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Miscellaneous", color: "orange",
            text: "Some expenses don't fit neatly into a category.", icon: Package },
        blocks: [
            {
                key: "miscellaneousItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "gifts", label: "Gifts", icon: Gift },
                    { value: "donations", label: "Donations", icon: HeartPlus },
                    { value: "unexpected-expenses", label: "Unexpected expenses", icon: TriangleAlert },
                    { value: "miscellaneous", label: "Miscellaneous", icon: Package },
                ],
            },
        ],
    },
    // savings
    {
        id: "savings",
        subheader: "Categories",
        header: "Setting up categories.",
        text: "Select all that apply. You can edit or add more later.",
        blurb: { title: "Savings", color: "emerald",
            text: "Planning ahead can create more stability, flexibility, and peace of mind.", icon: HandCoins },
        blocks: [
            {
                key: "savingsItems",
                selectMode: "multi",
                layout: "list",
                options: [
                    { value: "rainy-day-fund", label: "Rainy day fund", icon: Umbrella },
                    { value: "savings-account", label: "Savings account", icon: Wallet },
                    { value: "retirement-account", label: "Retirement account", icon: Sprout }, // fixed typo
                    { value: "investment-account", label: "Investment account", icon: Leaf },
                ],
            },
        ],
    },
];

const completeStep = {
    id: "complete",
    header: "Your nest is ready!",
    text: "This is just a starting point. You can change or customize anything whenever you'd like. Start by adding in numbers to get your budget working for you.",
    finalButtonText: "Go to my dashboard",
    finalCaption: "You can add, edit, or remove categories and items at any time from your dashboard.",
};

/**
 * Computes the actual list of steps to show, given the answers so far.
 * Called on every render... as `answers.categories` or `answers.path`
 * change, the step list updates automatically (progress bar)
 */
export function getVisibleSteps(answers) {
    const selectedCategories = answers.categories || [];
    const skipCategoryPicking = answers.path === "do-it-myself";

    // skip screens if user clicks do it themselves
    const visibleCoreSteps = skipCategoryPicking
        ? coreSteps.filter((s) => s.id !== "base-category")
        : coreSteps;

    const detailSteps = skipCategoryPicking
        ? []
        : selectedCategories
              .map((categoryValue) => categoryStepMap[categoryValue])
              .filter(Boolean)
              .map((stepId) => categoryDetailSteps.find((s) => s.id === stepId))
              .filter(Boolean);

    return [...visibleCoreSteps, ...detailSteps, completeStep];
}