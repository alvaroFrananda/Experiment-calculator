// =========================================
// 1. DOM ELEMENTS
// =========================================

// Input Plat Nomor
const platePart1 = document.getElementById('platePart1');
const platePart2 = document.getElementById('platePart2');
const platePart3 = document.getElementById('platePart3');

// Visualisasi Input Plat (Preview Atas)
const visPart1 = document.getElementById('visPart1');
const visPart2 = document.getElementById('visPart2');
const visPart3 = document.getElementById('visPart3');
const plateVisualContainer = document.querySelector('.plate-visual-container');
const plateInfoArea = document.querySelector('.plate-info-area');

// Labels
const plateLabelElement = document.getElementById('plateLabel');
const plateLabelPart1 = document.getElementById('plateLabelPart1');
const plateLabelPart2 = document.getElementById('plateLabelPart2');
const plateLabelPart3 = document.getElementById('plateLabelPart3');
const vehicleCategoryLabelElem = document.getElementById('vehicleCategoryLabel');
const roleLabelElem = document.getElementById('roleLabel');

// Role Exempt Select
const roleExemptSelect = document.getElementById('roleExempt');
const roleOptTidak = document.getElementById('roleOptTidak');
const roleOptRIVE = document.getElementById('roleOptRIVE');
const roleOptBVET1 = document.getElementById('roleOptBVET1');
const roleOptBVET2 = document.getElementById('roleOptBVET2');
const roleOptBVET3 = document.getElementById('roleOptBVET3');
const roleOptTVE = document.getElementById('roleOptTVE');

// Switcher & Checkboxes
const isElectrifiedSwitch = document.getElementById('isElectrified');
const electrifiedCheckboxGroup = document.getElementById('electrifiedCheckboxGroup');
const electrifiedLabel = document.getElementById('electrifiedLabel');
const electrifiedNote = document.getElementById('electrifiedNote');

const isDomesticSwitch = document.getElementById('isDomestic');
const domesticCheckboxGroup = document.getElementById('domesticCheckboxGroup');
const domesticLabel = document.getElementById('domesticLabel');
const domesticNote = document.getElementById('domesticNote');

const isLuxuryCarSwitch = document.getElementById('isLuxuryCar');
const luxuryCarLabel = document.getElementById('luxuryCarLabel');
const isSportscarSwitch = document.getElementById('isSportscar');
const sportscarLabel = document.getElementById('sportscarLabel');
const isVehicleAlreadyRegisteredSwitch = document.getElementById('isVehicleAlreadyRegistered');
const alreadyRegisteredLabel = document.getElementById('alreadyRegisteredLabel');

// Mode & Sections
const calculatorModeSwitcher = document.getElementById('calculatorModeSwitcher'); // Jika masih ada referensi
const modeLabel = document.getElementById('modeLabel');
const modeNewRegOpt = document.getElementById('modeNewRegOpt');
const modePlateTransferOpt = document.getElementById('modePlateTransferOpt');
const newRegistrationModeSection = document.getElementById('newRegistrationModeSection');
const plateTransferModeSection = document.getElementById('plateTransferModeSection');
const sharedVehicleOptionsSection = document.getElementById('sharedVehicleOptionsSection');

// Instructions & Info
const instructionsDiv = document.getElementById('instructions');
const instructionsTitle = document.getElementById('instructionsTitle');
const newRegInstructionsList = instructionsDiv.querySelector('ol:not(#transferInstructions)');
const transferInstructionsList = document.getElementById('transferInstructions');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const transferStep1 = document.getElementById('transferStep1');
const transferStep2 = document.getElementById('transferStep2');
const transferStep3 = document.getElementById('transferStep3');
const transferStep4 = document.getElementById('transferStep4');
const orgInfo = document.getElementById('orgInfo');
const transferBaseTaxDisplay = document.getElementById('transferBaseTaxDisplay');

// Errors
const derivedFormatDiv = document.getElementById('derivedFormat');
const plateErrorDiv = document.getElementById('plateError');
const plateCodeErrorDiv = document.getElementById('plateCodeError');
const platePart3ErrorDiv = document.getElementById('platePart3Error');

// Results Area
const calculateButton = document.getElementById('calculateButton');
const resultDiv = document.getElementById('result');
const resultTitleLabel = document.getElementById('resultTitleLabel');
const resultValueDiv = document.getElementById('resultValue');
const resultDetailsList = document.getElementById('resultDetailsList');
const copyInstructionDiv = document.getElementById('copyInstruction');

// Result Plate Visual Elements
const resultPlateContainer = document.getElementById('resultPlateContainer');
const resultPlateVisual = document.getElementById('resultPlateVisual');
const resVisPart1 = document.getElementById('resVisPart1');
const resVisPart2 = document.getElementById('resVisPart2');
const resVisPart3 = document.getElementById('resVisPart3');
const plateCopyInstruction = document.getElementById('plateCopyInstruction');
const availabilityNote = document.getElementById('availabilityNote');
const renewalNote = document.getElementById('renewalNote');


// =========================================
// 2. STATE & CONFIG
// =========================================

let currentPlateFormat = null;
let currentLang = 'id';
let currentMode = 'newRegistration'; 
let lastResult = { pajak: 0, komponen: [] };

const validPlateCodes = new Set(['A', 'B', 'D', 'E', 'F', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W', 'Z', 'AA', 'AB', 'AD', 'AE', 'AG', 'BA', 'BB', 'BD', 'BE', 'BG', 'BH', 'BK', 'BL', 'BM', 'BN', 'BP', 'DA', 'KB', 'KH', 'KT', 'KU', 'DH', 'DK', 'DR', 'EA', 'EB', 'ED', 'DC', 'DD', 'DN', 'DP', 'DT', 'DW', 'DL', 'DM', 'DB', 'DE', 'DG', 'PA', 'PB', 'PG', 'PS', 'PT', 'PY']);
const generalProhibitedSuffixes = new Set(['AF', 'BD', 'BH', 'BL', 'BN', 'BP', 'BS', 'BU', 'DI', 'DR', 'ES', 'ER', 'IR', 'II', 'PR', 'QH', 'QQ', 'QZ', 'RF', 'ZF', 'OVQ']);

const translations = {
    id: {
        htmlLang: "id", title: "OCDIDRP | Kalkulator Pajak Kendaraan", langLabel: "Bahasa:",
        modeLabel: "Mode Kalkulator:",
        modeNewReg: "Registrasi Baru",
        modePlateTransfer: "Transfer Plat Nomor",
        instructionsTitleNewReg: "Cara Menggunakan (Registrasi Baru):",
        instructionsTitleTransfer: "Cara Menggunakan (Transfer Plat Nomor):",
        step1: "Masukkan plat nomor yang ingin Anda daftarkan.",
        step2: "Cek Banned Vehicle List dan Vehicle Registration Guide untuk informasi role exempt dan/atau pajak tambahan kendaraan yang ingin Anda daftarkan.",
        step3: "Masukkan role exempt dan pilih golongan kendaraan sesuai daftar tersebut. Jika nama kendaraan Anda tidak tercantum, pilih 'Tidak Ada'.",
        transferStep1: "Tentukan apakah kendaraan tujuan transfer Anda sudah terdaftar sebelumnya atau belum.",
        transferStep2: "Jika belum, lihat Banned Vehicles List dan Registration Guide untuk biaya tambahan yang diperlukan untuk mendaftar kendaraan tersebut.",
        transferStep3: "Jika sudah, Anda hanya akan dikenakan pajak transfer dasar.",
        transferStep4: "Kendaraan dapat didaftarkan dengan lebih dari satu plat nomor, namun perlu dicatat bahwa tiap plat nomor dihitung satu slot registrasi.",
        orgInfo: "[KORLANTAS IRP - 2026]",
        plateLabel: "Plat Nomor Kendaraan",
        plateLabelPart1: "Kode Wilayah",  
        plateLabelPart2: "Nomor Unik",
        plateLabelPart3: "Huruf Unik",
        roleLabel: `Role Exempt Kendaraan (<a href="https://docs.google.com/document/d/11cQ6j_tCFARcTymNVf7zGYn0x2OZ-M_J7G_cXFt7Mdg/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Lihat Banned List</a>)`,
        roleTidak: "Tidak Ada",
        roleRIVE: "RIVE - Rare Import Vehicle Exempt",
        roleBVET1: "BVE Tier 1 - Banned Vehicle Exempt Tier 1",
        roleBVET2: "BVE Tier 2 - Banned Vehicle Exempt Tier 2",
        roleBVET3: "BVE Tier 3 - Banned Vehicle Exempt Tier 3/Ultra Luxurious",
        roleTVE: "TVE - Tuned Vehicle Exempt",
        vehicleCategoryLabel: `Golongan Kendaraan (<a href="https://docs.google.com/document/d/1z-fa2qFoCki1u_0QpX1KsU-VR7H9-fC7DoicjZE4X5M/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Lihat Registration Guide</a>)`,
        electrifiedLabel: "Elektrifikasi / Pajak Rendah",
        electrifiedNote: "Hanya untuk kendaraan plat standar",
        domesticLabel: "Domestik / Lokal",
        domesticNote: "Hanya untuk kendaraan plat standar",
        luxuryCarLabel: "Luxury Car",
        sportscarLabel: "Sportscar",
        calculateButton: "Hitung Pajak", resultTitle: "Total Pajak:", detailsTitle: "Rincian Perhitungan:",
        derivedPrefix: "Format Plat:", invalidFormat: "Format nomor tidak valid.",
        plateError: "Isi kode wilayah & nomor unik plat.", plateCodeError: "Kode wilayah tidak valid.",
        platePart3Error: "Kode akhir plat tidak diizinkan.",
        alertErrorNewReg: "Mohon periksa kembali input plat nomor Anda.",
        alertErrorTransfer: "Mohon buat pilihan pada checkbox.",
        
        // --- Copy Texts ---
        clickToCopy: "Klik nominal di atas untuk menyalin",
        clickPlateToCopy: "Klik plat nomor untuk menyalin teks", // BARU
        copied: "Berhasil disalin!",
        availabilityNote: "Pastikan plat nomor belum terpakai oleh orang lain sebelum melakukan registrasi.", 
        
        base: "Pajak Plat Dasar",
        riveBonus: "Biaya Tambahan RIVE",
        bvet1Surcharge: "Biaya Tambahan BVE Tier 1",
        bvet2Surcharge: "Biaya Tambahan BVE Tier 2",
        bvet3Surcharge: "Biaya Tambahan BVE Tier 3",
        luxuryCarBonus: "Biaya Tambahan Luxury Car",
        sportscarBonus: "Biaya Tambahan Sportscar",
        plateFee: "Biaya Plat Khusus", 
        base25: "Diskon Kendaraan Pajak Rendah (25% Pajak Plat Dasar)",
        base20: "Diskon Kendaraan Domestik (20% Pajak Plat Dasar)",
        transferBaseTax: "Pajak Transfer Dasar",
        alreadyRegisteredLabel: "Kendaraan tujuan transfer sudah terdaftar dengan plat nomor Lain",
        renewalFee: "Biaya Perpanjangan (per 3 bulan)",
        renewalNote: "Catatan: Semua plat nomor 1 dan 2 digit, serta 3 digit blank, wajib diperpanjang setiap 3 bulan dengan biaya sebesar 10% dari pajak plat khusus tersebut.",
    },
    en: {
        htmlLang: "en", title: "OCDIDRP | Vehicle Tax Calculator", langLabel: "Language:",
        modeLabel: "Calculator Mode:",
        modeNewReg: "New Registration",
        modePlateTransfer: "Number Plate Transfer",
        instructionsTitleNewReg: "How to Use (New Registration):",
        instructionsTitleTransfer: "How to Use (Number Plate Transfer):",
        step1: "Enter the vehicle plate number you want to register.",
        step2: "Check the Banned Vehicle List and Vehicle Registration Guide for information on required role exempts and/or additional taxes for the vehicle.",
        step3: "Enter the role exempt and select vehicle categories accordingly. If your vehicle is not listed, select 'None'.",
        transferStep1: "Determine if your target transfer vehicle is already registered or not.",
        transferStep2: "If not, refer to the Banned Vehicles List and Registration Guide for any additional fees required to register the vehicle.",
        transferStep3: "If it is, you will only be charged the base transfer tax.",
        transferStep4: "Vehicles can be registered with more than one number plate, but note that each number plate counts as one registration slot.",
        orgInfo: "[KORLANTAS IRP - 2026]",
        plateLabel: "Vehicle Plate Number",
        plateLabelPart1: "Area Code",
        plateLabelPart2: "Unique Number",
        plateLabelPart3: "Unique Letters",
        roleLabel: `Vehicle Exempt Role (<a href="https://docs.google.com/document/d/11cQ6j_tCFARcTymNVf7zGYn0x2OZ-M_J7G_cXFt7Mdg/edit?usp=sharing" target="_blank" rel="noopener noreferrer">See Banned List</a>)`,
        roleTidak: "None",
        roleRIVE: "RIVE - Rare Import Vehicle Exempt",
        roleBVET1: "BVE Tier 1 - Banned Vehicle Exempt Tier 1",
        roleBVET2: "BVE Tier 2 - Banned Vehicle Exempt Tier 2",
        roleBVET3: "BVE Tier 3 - Banned Vehicle Exempt Tier 3/Ultra Luxurious",
        roleTVE: "TVE - Tuned Vehicle Exempt",
        vehicleCategoryLabel: `Vehicle Category (<a href="https://docs.google.com/document/d/1z-fa2qFoCki1u_0QpX1KsU-VR7H9-fC7DoicjZE4X5M/edit?usp=sharing" target="_blank" rel="noopener noreferrer">See Registration Guide</a>)`,
        electrifiedLabel: "Electrification / Low Tax",
        electrifiedNote: "For standard plates only",
        domesticLabel: "Domestic / Local",
        domesticNote: "For standard plates only",
        luxuryCarLabel: "Luxury Car",
        sportscarLabel: "Sportscar",
        calculateButton: "Calculate Tax", resultTitle: "Total Tax:", detailsTitle: "Calculation Details:",
        derivedPrefix: "Plate Format:", invalidFormat: "Invalid number format.",
        plateError: "Fill plate area code & unique number.", plateCodeError: "Invalid area code.",
        platePart3Error: "Plate suffix not allowed.",
        alertErrorNewReg: "Please check your number plate input.",
        alertErrorTransfer: "Please make a selection on the checkbox.",
        
        // --- Copy Texts ---
        clickToCopy: "Click the amount above to copy",
        clickPlateToCopy: "Click number plate to copy text", // BARU
        copied: "Copied!", 
        availabilityNote: "Ensure the number plate is not already in use by someone else before registering.",
        
        base: "Base Plate Tax",
        riveBonus: "RIVE Surcharge",
        bvet1Surcharge: "BVE Tier 1 Surcharge",
        bvet2Surcharge: "BVE Tier 2 Surcharge",
        bvet3Surcharge: "BVE Tier 3 Surcharge",
        luxuryCarBonus: "Luxury Car Surcharge",
        sportscarBonus: "Sportscar Surcharge",
        plateFee: "Custom Plate Fee", 
        base25: "Low Tax Vehicle Discount (25% Base Plate Tax)",
        base20: "Domestic Vehicle Discount (20% Base Plate Tax)",
        transferBaseTax: "Base Transfer Tax",
        alreadyRegisteredLabel: "Target transfer vehicle is already registered with another plate number",
        renewalFee: "Renewal Fee (every 3 months)",
        renewalNote: "Note: All 1-, 2-, and Blank 3-digit number plates must be renewed every 3 months for a fee equal to 10% of the custom plate tax",
    }
};

// =========================================
// 3. LOGIC FUNCTIONS
// =========================================

function formatRupiah(number) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number).replace('IDR', 'IDR '); }
function derivePlateFormat(part2Value, part3Value) { const num = parseInt(part2Value, 10); const hasLetters = part3Value.length > 0; if (isNaN(num) || part2Value.length === 0) return null; if (num >= 1 && num <= 9) return hasLetters ? "1-digit with letters" : "1-digit blank"; if (num >= 10 && num <= 99) return hasLetters ? "2-digit with letters" : "2-digit blank"; if (num >= 100 && num <= 999) return hasLetters ? "3-digit with letters" : "3-digit blank"; if (num >= 1000 && num <= 9999) return hasLetters ? "Standard/4-digit with letters" : "4-digit blank"; return null; }

function calculateNewRegistrationTax(role, electrified, domestic, luxuryCar, sportscar, format) {
    const base = 500000;
    let komponen = [];
    let pajak = 0;

    if (!format) return { pajak: 0, komponen: [] };

    const fixedRates = { 
        "4-digit blank": 10000000, 
        "3-digit with letters": 25000000, "3-digit blank": 60000000, 
        "2-digit with letters": 50000000, "2-digit blank": 80000000, 
        "1-digit with letters": 90000000, "1-digit blank": 120000000 
    };

    if (format === "Standard/4-digit with letters") {
        if (electrified) {
            pajak = 0.25 * base;
            komponen.push(["base25", 0.25 * base]);
        } else if (domestic) {
            pajak = 0.2 * base;
            komponen.push(["base20", 0.2 * base]);
        } else {
            pajak = base;
            komponen.push(["base", base]);
        }
    } else {
        pajak = fixedRates[format] || 0;
        komponen.push(["plateFee", pajak, format]);
    }

    if (role === "RIVE") { pajak += 3000000; komponen.push(["riveBonus", 3000000]); }
    else if (role === "BVET1") { pajak += 5000000; komponen.push(["bvet1Surcharge", 5000000]); }
    else if (role === "BVET2") { pajak += 7000000; komponen.push(["bvet2Surcharge", 7000000]); }
    else if (role === "BVET3") { pajak += 10000000; komponen.push(["bvet3Surcharge", 10000000]); }
    
    if (luxuryCar) { pajak += 2000000; komponen.push(["luxuryCarBonus", 2000000]); }
    if (sportscar) { pajak += 20000000; komponen.push(["sportscarBonus", 20000000]); }

    let isPremiumPlate = false;
    let renewalFee = 0;
    const RENEWAL_PERCENTAGE = 0.10; 

    if (format === "1-digit blank" || format === "1-digit with letters" || 
        format === "2-digit blank" || format === "2-digit with letters" ||
        format === "3-digit blank") {
        
        isPremiumPlate = true;
        
        const basePlateFee = fixedRates[format] || 0;
        renewalFee = basePlateFee * RENEWAL_PERCENTAGE; 
    }

    return { pajak: Math.round(pajak), komponen: komponen, isPremiumPlate: isPremiumPlate, renewalFee: Math.round(renewalFee) };
}

function calculatePlateTransferTax(role, luxuryCar, sportscar, isAlreadyRegistered) {
    const baseTransferTax = 2000000;
    let komponen = [["transferBaseTax", baseTransferTax]];
    let pajak = baseTransferTax;

    if (!isAlreadyRegistered) {
        if (role === "RIVE") { pajak += 3000000; komponen.push(["riveBonus", 3000000]); }
        else if (role === "BVET1") { pajak += 5000000; komponen.push(["bvet1Surcharge", 5000000]); }
        else if (role === "BVET2") { pajak += 7000000; komponen.push(["bvet2Surcharge", 7000000]); }
        else if (role === "BVET3") { pajak += 10000000; komponen.push(["bvet3Surcharge", 10000000]); }
        
        if (luxuryCar) { pajak += 2000000; komponen.push(["luxuryCarBonus", 2000000]); }
        if (sportscar) { pajak += 20000000; komponen.push(["sportscarBonus", 20000000]); }
    }
    return { pajak: Math.round(pajak), komponen: komponen, isPremiumPlate: false, renewalFee: 0 };
}

function displayResults({ pajak, komponen }) {
    const t = translations[currentLang];
    resultTitleLabel.textContent = t.resultTitle; 
    resultValueDiv.textContent = formatRupiah(pajak); 

    if (currentMode === 'newRegistration' && platePart1.value && platePart2.value) {
        resultPlateContainer.style.display = 'flex';
        // Salin nilai dari input ke visual hasil
        resVisPart1.textContent = platePart1.value;
        resVisPart2.textContent = platePart2.value;
        resVisPart3.textContent = platePart3.value;
    } else {
        // Sembunyikan jika mode transfer atau data tidak lengkap
        resultPlateContainer.style.display = 'none';
    }

    if (resultDetailsList) {
        resultDetailsList.innerHTML = ''; // Kosongkan list lama
        
        komponen.forEach(([key, value, extra]) => {
            const li = document.createElement('li');
            const labelSpan = document.createElement('span');
            const valueSpan = document.createElement('span');
            
            let labelText = t[key] || key;
            if (key === 'plateFee') { labelText = `${t.plateFee} (${extra})`; }
            
            labelSpan.className = 'result-label';
            labelSpan.textContent = labelText + ':';
            
            valueSpan.className = 'result-value';
            valueSpan.textContent = formatRupiah(value);
            
            li.appendChild(labelSpan);
            li.appendChild(valueSpan);
            resultDetailsList.appendChild(li);
        });

        if (lastResult.isPremiumPlate) {
            const li = document.createElement('li');
            li.className = 'renewal-fee-item';
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'result-label';
            labelSpan.textContent = t.renewalFee + ':';
            
            const valueSpan = document.createElement('span');
            valueSpan.className = 'result-value';
            valueSpan.textContent = formatRupiah(lastResult.renewalFee);
            
            li.appendChild(labelSpan);
            li.appendChild(valueSpan);
            resultDetailsList.appendChild(li);

            // Tampilkan Note
            if (renewalNote) {
                renewalNote.textContent = t.renewalNote;
                renewalNote.style.display = 'block';
            }
        } else {
            if (renewalNote) renewalNote.style.display = 'none';
        }

        if (availabilityNote) {
            availabilityNote.textContent = t.availabilityNote;
        }
    }

    resultDiv.style.display = 'flex';  
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
}

function isPlatePart3Valid(part1, part2, part3) { if (part1 === 'B' && part2 === '1305' && part3 === 'KEN') { return false; } if (part3.length === 0) { return true; } if (generalProhibitedSuffixes.has(part3)) return false; if (part3.startsWith('RF')) return false; if (part3.startsWith('ZZ')) return false; if (part1 === 'B' && part3 === 'FZ') return false; if (part1 === 'BP' && part3 === 'FV') return false; if (part1 === 'D' && part3 === 'IV') return false; if (part1 === 'BP' && part3 === 'ZX') return false; return true; }

function updateUI() {
    const t = translations[currentLang];
    
    if (currentMode === 'newRegistration') {
        newRegistrationModeSection.style.display = 'block';
        plateVisualContainer.style.display = 'flex';
        plateInfoArea.style.display = 'block';
        plateTransferModeSection.style.display = 'none';
        instructionsTitle.textContent = t.instructionsTitleNewReg;
        newRegInstructionsList.style.display = 'block';
        transferInstructionsList.style.display = 'none';
        
        sharedVehicleOptionsSection.style.display = 'block';
        roleExemptSelect.disabled = false;
        isLuxuryCarSwitch.disabled = false;
        isSportscarSwitch.disabled = false;

        const platePart1Value = platePart1.value;
        const platePart2Value = platePart2.value;
        const platePart3Value = platePart3.value;
        currentPlateFormat = derivePlateFormat(platePart2Value, platePart3Value);
        const isStandar = currentPlateFormat === "Standard/4-digit with letters";

        visPart1.textContent = platePart1Value || '\u00A0';
        visPart2.textContent = platePart2Value || '\u00A0';
        visPart3.textContent = platePart3Value || '\u00A0';

        let isCodeValid = false;
        plateCodeErrorDiv.textContent = '';
        if (platePart1Value.length > 0) {
            isCodeValid = validPlateCodes.has(platePart1Value);
            if (!isCodeValid) { plateCodeErrorDiv.textContent = t.plateCodeError; }
        }

        let isPart3Valid = isPlatePart3Valid(platePart1Value, platePart2Value, platePart3Value);
        platePart3ErrorDiv.textContent = '';
        if (!isPart3Valid) { platePart3ErrorDiv.textContent = t.platePart3Error; }

        const isValidForDisplay = platePart1Value.length >= 1 && platePart2Value.length >=1 && isCodeValid && isPart3Valid && currentPlateFormat;
        const isFullyValidForCalculation = isValidForDisplay;

        if (isValidForDisplay) {
            plateVisualContainer.style.display = 'flex';
            derivedFormatDiv.style.display = 'block';
            derivedFormatDiv.textContent = `${t.derivedPrefix} ${currentPlateFormat}`;
        } else {
            plateVisualContainer.style.display = 'none';
            derivedFormatDiv.style.display = 'none';
            derivedFormatDiv.textContent = '';
        }
        
        plateErrorDiv.textContent = (platePart1Value.length < 1 || platePart2Value.length < 1) && !isValidForDisplay ? t.plateError : '';
        
        if (isStandar) {
            // Tampilkan Elektrifikasi (gunakan 'flex' atau 'block' tidak masalah karena dibungkus grid)
            electrifiedCheckboxGroup.style.display = 'flex'; 
            isElectrifiedSwitch.disabled = false;
            // Kita sembunyikan note via CSS atau biarkan tampil sebagai info
            if(electrifiedNote) electrifiedNote.style.display = 'none'; 

            // Tampilkan Domestik
            domesticCheckboxGroup.style.display = 'flex';
            isDomesticSwitch.disabled = false;
            if(domesticNote) domesticNote.style.display = 'none';
        } else {
            // Tetap tampilkan tombolnya tapi disable (biar grid tetap rapi 4 kotak)
            // ATAU sembunyikan sepenuhnya. 
            // Opsi A: Sembunyikan (Grid akan jadi 2 kotak)
            electrifiedCheckboxGroup.style.display = 'none';
            domesticCheckboxGroup.style.display = 'none';
            
            // Reset Values
            isElectrifiedSwitch.disabled = true;
            isElectrifiedSwitch.checked = false;
            
            isDomesticSwitch.disabled = true;
            isDomesticSwitch.checked = false;
            
            // Note logic handled by CSS/HTML structure now
        }
        
        calculateButton.disabled = !isFullyValidForCalculation;

    } else if (currentMode === 'plateTransfer') {
        newRegistrationModeSection.style.display = 'none';
        plateVisualContainer.style.display = 'none'; 
        plateInfoArea.style.display = 'none'; 
        plateTransferModeSection.style.display = 'block';
        instructionsTitle.textContent = t.instructionsTitleTransfer;
        newRegInstructionsList.style.display = 'none';
        transferInstructionsList.style.display = 'block';
        transferBaseTaxDisplay.textContent = `${t.transferBaseTax}: ${formatRupiah(2000000)}`;

        const alreadyRegistered = isVehicleAlreadyRegisteredSwitch.checked;
        if (alreadyRegistered) {
            sharedVehicleOptionsSection.style.display = 'none';
            roleExemptSelect.disabled = true;
            
            isElectrifiedSwitch.disabled = true;
            isElectrifiedSwitch.checked = false;
            isDomesticSwitch.disabled = true;
            isDomesticSwitch.checked = false;
            
            isLuxuryCarSwitch.disabled = true;
            isLuxuryCarSwitch.checked = false;
            isSportscarSwitch.disabled = true;
            isSportscarSwitch.checked = false;

        } else {
            sharedVehicleOptionsSection.style.display = 'block';
            roleExemptSelect.disabled = false;
            
            electrifiedCheckboxGroup.style.display = 'none';
            isElectrifiedSwitch.disabled = true;
            isElectrifiedSwitch.checked = false;
            
            domesticCheckboxGroup.style.display = 'none';
            isDomesticSwitch.disabled = true;
            isDomesticSwitch.checked = false;
            
            isLuxuryCarSwitch.disabled = false;
            isSportscarSwitch.disabled = false;
        }
        calculateButton.disabled = false; 
    }
    
    if (currentMode !== 'newRegistration') {
         plateCodeErrorDiv.textContent = '';
         platePart3ErrorDiv.textContent = '';
         derivedFormatDiv.textContent = '';
         plateErrorDiv.textContent = '';
    }
}

function changeLanguage(lang) {
    currentLang = lang; const t = translations[lang];
    document.documentElement.lang = t.htmlLang; document.title = t.title;

    modeNewRegOpt.textContent = t.modeNewReg;           
    modePlateTransferOpt.textContent = t.modePlateTransfer; 
    
    document.getElementById('mainTitle').textContent = t.title;
    
    step1.textContent = t.step1;
    step2.textContent = t.step2;
    step3.textContent = t.step3;
    transferStep1.textContent = t.transferStep1;
    transferStep2.textContent = t.transferStep2;
    transferStep3.textContent = t.transferStep3;
    transferStep4.textContent = t.transferStep4;
    orgInfo.textContent = t.orgInfo;

    plateLabelElement.textContent = t.plateLabel;
    plateLabelPart1.textContent = t.plateLabelPart1;
    plateLabelPart2.textContent = t.plateLabelPart2;
    plateLabelPart3.textContent = t.plateLabelPart3;

    roleLabelElem.innerHTML = t.roleLabel;
    roleOptTidak.textContent = t.roleTidak;
    roleOptRIVE.textContent = t.roleRIVE;
    roleOptBVET1.textContent = t.roleBVET1;
    roleOptBVET2.textContent = t.roleBVET2;
    roleOptBVET3.textContent = t.roleBVET3;
    roleOptTVE.textContent = t.roleTVE;
    
    vehicleCategoryLabelElem.innerHTML = t.vehicleCategoryLabel;
    
    electrifiedLabel.textContent = t.electrifiedLabel;
    electrifiedNote.textContent = t.electrifiedNote;
    domesticLabel.textContent = t.domesticLabel;
    domesticNote.textContent = t.domesticNote;
    
    luxuryCarLabel.textContent = t.luxuryCarLabel;
    sportscarLabel.textContent = t.sportscarLabel;
    alreadyRegisteredLabel.textContent = t.alreadyRegisteredLabel;
    
    calculateButton.textContent = t.calculateButton;
    document.getElementById('detailsTitle').textContent = t.detailsTitle;

    // Update instruksi copy nominal
    if (copyInstructionDiv) {
        copyInstructionDiv.textContent = t.clickToCopy;
        copyInstructionDiv.className = ''; 
    }
    
    // Update instruksi copy plat
    if (plateCopyInstruction) {
        plateCopyInstruction.textContent = t.clickPlateToCopy;
        plateCopyInstruction.className = '';
    }

    if (availabilityNote) {
        availabilityNote.textContent = t.availabilityNote;
    }
    updateUI(); 
    
    if (resultDiv.style.display === 'flex') {
        displayResults(lastResult);
    }
}

function hideResultsOnInputChange() {
    resultDiv.style.display = 'none';
    if (renewalNote) renewalNote.style.display = 'none';
    updateUI();
}


// =========================================
// 4. EVENT LISTENERS
// =========================================

// Language Slider
const languageRadios = document.querySelectorAll('input[name="language"]');
languageRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
});

// Calculator Mode Slider
const modeRadios = document.querySelectorAll('input[name="calculatorMode"]');
modeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentMode = e.target.value;
        // Reset inputs when switching modes
        platePart1.value = ''; platePart2.value = ''; platePart3.value = '';
        roleExemptSelect.value = 'Tidak';
        isElectrifiedSwitch.checked = false;
        isDomesticSwitch.checked = false;
        isLuxuryCarSwitch.checked = false;
        isSportscarSwitch.checked = false;
        isVehicleAlreadyRegisteredSwitch.checked = false;
        hideResultsOnInputChange();
    });
});

// Input listeners
platePart1.addEventListener('input', (e) => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, ''); hideResultsOnInputChange(); });
platePart2.addEventListener('input', (e) => { let val = e.target.value.replace(/[^0-9]/g, ''); if (val.length > 0 && parseInt(val, 10) === 0) val = ''; if (val.startsWith('0')) val = val.substring(1); e.target.value = val; hideResultsOnInputChange(); });
platePart3.addEventListener('input', (e) => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, ''); hideResultsOnInputChange(); });

roleExemptSelect.addEventListener('change', hideResultsOnInputChange);
isElectrifiedSwitch.addEventListener('change', hideResultsOnInputChange);
isDomesticSwitch.addEventListener('change', hideResultsOnInputChange);
isLuxuryCarSwitch.addEventListener('change', hideResultsOnInputChange);
isSportscarSwitch.addEventListener('change', hideResultsOnInputChange);
isVehicleAlreadyRegisteredSwitch.addEventListener('change', hideResultsOnInputChange);

calculateButton.addEventListener('click', () => {
    const t = translations[currentLang];
    if (currentMode === 'newRegistration') {
        const platePart1Value = platePart1.value;
        const platePart2Value = platePart2.value;
        const platePart3Value = platePart3.value;
        const currentDerivedFormat = derivePlateFormat(platePart2Value, platePart3Value);
        const currentCodeValid = validPlateCodes.has(platePart1Value);
        const currentPart3Valid = isPlatePart3Valid(platePart1Value, platePart2Value, platePart3Value);

        if (!(platePart1Value.length >= 1 && platePart2Value.length >= 1 && currentDerivedFormat && currentCodeValid && currentPart3Valid)) {
            alert(t.alertErrorNewReg); return;
        }
        const role = roleExemptSelect.value;
        const electrified = isElectrifiedSwitch.checked;
        const domestic = isDomesticSwitch.checked;
        const luxuryCar = isLuxuryCarSwitch.checked;
        const sportscar = isSportscarSwitch.checked;
        lastResult = calculateNewRegistrationTax(role, electrified, domestic, luxuryCar, sportscar, currentDerivedFormat);
    } else if (currentMode === 'plateTransfer') {
        const role = roleExemptSelect.value;
        const luxuryCar = isLuxuryCarSwitch.checked;
        const sportscar = isSportscarSwitch.checked;
        const isAlreadyRegistered = isVehicleAlreadyRegisteredSwitch.checked;
        lastResult = calculatePlateTransferTax(role, luxuryCar, sportscar, isAlreadyRegistered);
    }
    displayResults(lastResult);
});

// =========================================
// 5. COPY TO CLIPBOARD LOGIC
// =========================================

// --- Logic Copy Nominal Pajak ---
resultValueDiv.addEventListener('click', () => {
    const textToCopy = resultValueDiv.textContent;
    const t = translations[currentLang]; 

    if (!textToCopy || textToCopy === 'Rp 0,-') return;

    navigator.clipboard.writeText(textToCopy).then(() => {
        resultValueDiv.classList.add('copied');
        copyInstructionDiv.textContent = t.copied;
        copyInstructionDiv.classList.add('success');

        setTimeout(() => {
            resultValueDiv.classList.remove('copied');
            copyInstructionDiv.textContent = t.clickToCopy; 
            copyInstructionDiv.classList.remove('success');
        }, 1500);

    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
});

// --- Logic Copy Plat Nomor ---
resultPlateVisual.addEventListener('click', () => {
    // Gabungkan teks menjadi format string (Misal: "B 1234 XYZ")
    const p1 = resVisPart1.textContent;
    const p2 = resVisPart2.textContent;
    const p3 = resVisPart3.textContent;
    const plateText = `${p1} ${p2} ${p3}`.trim();
    
    const t = translations[currentLang];

    if (!plateText) return;

    navigator.clipboard.writeText(plateText).then(() => {
        // Visual Feedback
        resultPlateVisual.classList.add('copied');
        plateCopyInstruction.textContent = t.copied; // Menggunakan "Berhasil disalin!"
        plateCopyInstruction.classList.add('success');

        setTimeout(() => {
            resultPlateVisual.classList.remove('copied');
            plateCopyInstruction.textContent = t.clickPlateToCopy; // Kembali ke "Klik plat..."
            plateCopyInstruction.classList.remove('success');
        }, 1500);
    }).catch(err => {
        console.error('Gagal menyalin plat: ', err);
    });
});

// =========================================
// 6. INITIAL SETUP
// =========================================

// Cek status awal dari radio button saat halaman dimuat
const initialLang = document.querySelector('input[name="language"]:checked').value;
changeLanguage(initialLang);

const initialMode = document.querySelector('input[name="calculatorMode"]:checked').value;
currentMode = initialMode;

resultDiv.style.display = 'none';
updateUI();

// =========================================
// 7. INSTRUCTIONS TOGGLE (ACCORDION)
// =========================================

// 1. Set Default State ke Minimized (Tertutup)
instructionsDiv.classList.add('minimized');

// 2. Tambahkan Event Listener Klik
instructionsTitle.addEventListener('click', () => {
    // Toggle class 'minimized' pada container utama
    instructionsDiv.classList.toggle('minimized');
});
