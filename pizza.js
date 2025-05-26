let bannerbtn = document.querySelectorAll(".banner_align");
let banners = document.querySelector(".banner");
let right_menu = document.querySelector('.right_nav_head');
let menu_content = document.querySelector('.menu_content');
let toggle = false;
let currentSlide = 0;
let slideInterval = null;

let images = [
    { id: 1, src: `./assets/image/banner/1.jpg` },
    { id: 2, src: `./assets/image/banner/2.jpg` },
    { id: 3, src: `./assets/image/banner/3.jpg` },
    { id: 4, src: `./assets/image/banner/4.jpg` }
];



right_menu.addEventListener('click', function () {
    if (!toggle) {
        // Show the menu
        right_menu.innerText = 'X';
        menu_content.style.display = 'flex';
        menu_content.style.flexDirection = 'column'; // ✅ fixed this line
        menu_content.style.alignItems = "center";
        menu_content.style.justifyContent = "center";
        right_menu.style.transition = "all 0.4s ease-in-out";
        toggle = true;
    } else {
        // Hide the menu
        right_menu.innerText = '=';
        menu_content.style.display = 'none';
        toggle = false;
    }
});




// Function to change slide
function changeSlide(index) {
    // Update background image
    banners.style.backgroundImage = `url(${images[index].src})`;
    
    // Update active state of buttons
    bannerbtn.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
            btn.style.backgroundColor = 'rgb(128, 195, 243)'; // Set active background color
        } else {
            btn.classList.remove('active');
            btn.style.backgroundColor = 'transparent'; // Reset other buttons
        }
    });
    
    currentSlide = index;
}

// Function to start auto sliding
function startAutoSlide() {
    // Clear any existing interval first
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    // Set initial active state
    changeSlide(currentSlide);
    
    // Start new interval
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
        changeSlide(currentSlide);
    }, 4000);
}

// Add click event listeners to buttons
bannerbtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        changeSlide(index);
    });
});

// Start auto sliding when page loads
startAutoSlide();

// Fix pizza add button hover effect
let addCartButtons = document.getElementsByClassName("pizza_add");

Array.from(addCartButtons).forEach(button => {
    // Set initial styles
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.transition = "all 0.3s ease-in-out";
    button.style.whiteSpace = "nowrap";
    button.style.overflow = "hidden";
    button.style.minWidth = "40px";
    button.style.height = "40px";
    button.style.borderRadius = "20px";
    button.style.cursor = "pointer";

    button.addEventListener("mouseover", function() {
        this.innerText = "Add +";
        this.style.width = "100px";
        this.style.backgroundColor = "#ff4d4d";
        this.style.color = "white";
    });

    button.addEventListener("mouseout", function() {
        this.innerText = "+";
        this.style.width = "40px";
        this.style.backgroundColor = "";
        this.style.color = "";
    });
});

// State-City mapping
const stateCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Bomdila"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar"],
    "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Dharamshala", "Kullu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar"],
    "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer"],
    "Sikkim": ["Gangtok", "Namchi", "Mangan", "Rangpo", "Singtam"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur"],
    "West Bengal": ["Kolkata", "Siliguri", "Durgapur", "Asansol", "Bardhaman"]
};

// Get the select elements
const stateSelect = document.getElementById('stateSelect');
const citySelect = document.getElementById('citySelect');

// Add event listener to state select
stateSelect.addEventListener('change', function() {
    // Clear the city select
    citySelect.innerHTML = '<option value="">Select City</option>';
    
    // Get the selected state
    const selectedState = this.value;
    
    // If a state is selected, populate cities
    if (selectedState) {
        const cities = stateCities[selectedState];
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
});
