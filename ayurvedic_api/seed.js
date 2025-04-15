const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Solution = require('./models/Solution');
const Category = require('./models/Category');
require('dotenv').config();

const seedData = async () => {
    try {
        await connectDB();
        await Solution.deleteMany({});
        await Category.deleteMany({});

        const categories = await Category.insertMany([
            { name: 'Digestive Health' },
            { name: 'Mental Wellness' },
            { name: 'Sleep' },
            { name: 'Joint Health' },
            { name: 'Skin Care' },
            { name: 'Immunity' },
            { name: 'Cardiovascular' },
            { name: 'Metabolic' },
            { name: 'Respiratory' },
            { name: 'Chronic Fatigue' },
            { name: 'Headaches & Migraines' },
            { name: 'Irritable Bowel Syndrome' },
            { name: 'Menstrual Health' },
            { name: 'Weight Management' },
            { name: 'Hair Care' },
            { name: 'Eye Health' },
            { name: 'Detoxification' },
            {
                name: "Children's Health"
            },
            { name: 'Geriatric Health' },
        ]);

        const categoryMap = categories.reduce((map, cat) => ({ ...map, [cat.name]: cat._id }), {});

        const solutions = [
            {
                solutionId: 'AS001',
                title: 'Digestive Issues (Indigestion, Bloating, Acidity)',
                description: 'Identify and balance the Pitta dosha. Consume easily digestible, freshly cooked foods with ginger, cumin, coriander, and fennel. Drink warm water. Consider Triphala, Chitrakadi Vati, or Hingashtak Churna (after consultation). Practice mindful eating.',
                isPremium: false,
                categories: [categoryMap['Digestive Health']],
                ayurvedicApproach: [
                    "Identify and balance the Pitta dosha (responsible for digestion).",
                    "Consume easily digestible, freshly cooked foods, incorporating spices like ginger, cumin, coriander, and fennel.",
                    "Drinking warm water throughout the day aids digestion.",
                    "Consider digestive herbs like Triphala, Chitrakadi Vati, or Hingashtak Churna (after consultation); ginger with a pinch of rock salt before meals can stimulate digestive enzymes.",
                    "Practice mindful eating and avoid overeating; fennel and coriander tea can help soothe bloating and acidity.",
                    "Ensure regular meal times."
                ]
            },
            {
                solutionId: 'AS002',
                title: 'Stress and Anxiety',
                description: 'Balance Vata dosha. Practice calming yoga and meditation. Ensure regular sleep. Abhyanga (self-massage). Consider Ashwagandha and Brahmi (after consultation). Spend time in nature.',
                isPremium: false,
                categories: [categoryMap['Mental Wellness']],
                ayurvedicApproach: [
                    "Balance the Vata dosha (associated with movement and the nervous system).",
                    "Practice calming yoga and meditation.",
                    "Ensure a regular sleep schedule.",
                    "Abhyanga (self-massage with warm sesame or other dosha-specific oils).",
                    "Shirodhara (gentle pouring of oil on the forehead - requires a practitioner).",
                    "Consider adaptogenic herbs like Ashwagandha (known for reducing cortisol levels) and Brahmi (can help improve mental clarity and reduce anxiety) after consultation.",
                    "Spend time in nature."
                ]
            },
            {
                solutionId: 'AS003',
                title: 'Sleep Problems (Insomnia)',
                description: 'Balance Vata and Kapha doshas. Establish a consistent sleep routine. Avoid stimulants. Have a light, early dinner. Warm milk with nutmeg or cardamom. Relaxation techniques. Consider Tagara or Jatamansi (after consultation). Foot Abhyanga before sleep.',
                isPremium: false,
                categories: [categoryMap['Sleep']],
                ayurvedicApproach: [
                    "Balance the Vata and Kapha doshas (related to the nervous system and heaviness).",
                    "Establish a consistent sleep routine.",
                    "Avoid stimulants like caffeine, especially in the evening.",
                    "Have a light and early dinner.",
                    "Drink warm milk (contains tryptophan, an amino acid that can aid sleep) with a pinch of nutmeg or cardamom (have calming properties) before bed.",
                    "Practice relaxation techniques like deep breathing.",
                    "Consider calming herbs like Tagara or Jatamansi (after consultation).",
                    "Abhyanga (especially on the feet) before sleep."
                ]
            },
            {
                solutionId: 'AS004',
                title: 'Joint Pain and Inflammation',
                description: 'Balance Vata and Kapha doshas. Anti-inflammatory diet. Gentle exercise and yoga. Warm oil massage (Abhyanga). Warm compresses. Consider Turmeric, Shallaki, and Ginger (after consultation).',
                isPremium: false,
                categories: [categoryMap['Joint Health']],
                ayurvedicApproach: [
                    "Balance the Vata and Kapha doshas (related to movement and structure).",
                    "Eat a diet that reduces inflammation (avoid processed foods, red meat, etc.).",
                    "Gentle exercise and yoga to maintain joint mobility.",
                    "Warm oil massage (Abhyanga) with specific oils like Mahanarayan Taila or Gandha Thailam.",
                    "Apply warm compresses to affected areas.",
                    "Consider anti-inflammatory herbs like Turmeric (contains curcumin), Shallaki (Boswellia - shown to reduce pain and swelling), and Ginger (after consultation).",
                    "Panchakarma therapies like Janu Basti or Kati Basti (oil pooling around the knees or lower back - requires a practitioner)."
                ]
            },
            {
                solutionId: 'AS005',
                title: 'Skin Issues (Acne, Eczema, Dryness)',
                description: 'Balance Pitta (acne, eczema) and Vata (dryness) doshas. Healthy diet. Hydration. Cooling ingredients (aloe vera, sandalwood). Moisturizing oils (coconut, sesame). Consider Neem or Manjistha (after consultation).',
                isPremium: false,
                categories: [categoryMap['Skin Care']],
                ayurvedicApproach: [
                    "Identify and balance the Pitta dosha (related to heat and inflammation) for acne and eczema, and Vata dosha (related to dryness) for dry skin.",
                    "Maintain a healthy diet rich in fruits and vegetables.",
                    "Ensure proper hydration.",
                    "Apply cooling and soothing ingredients like aloe vera or sandalwood paste (for Pitta imbalances; sandalwood has a cooling effect).",
                    "Use moisturizing oils like coconut or sesame oil (for Vata imbalances).",
                    "Consider blood-purifying herbs like Neem (has antibacterial and anti-inflammatory properties) or Manjistha (after consultation).",
                    "Gentle detoxification therapies (under guidance)."
                ]
            },
            {
                solutionId: 'AS006',
                title: 'Weak Immunity',
                description: 'Strengthen Ojas. Balanced diet. Adequate sleep. Manage stress. Consume Rasayana herbs like Chyawanprash and Amalaki. Gentle exercise. Ensure proper digestion.',
                isPremium: false,
                categories: [categoryMap['Immunity']],
                ayurvedicApproach: [
                    "Strengthen the Ojas (vital energy and immunity).",
                    "Eat a balanced and nutritious diet.",
                    "Get adequate sleep.",
                    "Manage stress levels.",
                    "Consume Rasayana herbs (rejuvenatives) like Chyawanprash (known for boosting immunity) and Amalaki (Indian Gooseberry - a rich source of Vitamin C and a powerful antioxidant).",
                    "Practice yoga and gentle exercise.",
                    "Ensure proper digestion for nutrient absorption."
                ]
            },
            {
                solutionId: 'AS007',
                title: 'High Blood Pressure (Hypertension)',
                description: 'Balance Vata and Pitta doshas. Kapha-pacifying diet (reduce salt, oily, heavy foods). Increase potassium intake. Stress reduction (yoga, meditation). Moderate exercise. Consider Sarpagandha, Arjuna, Ashwagandha, Brahmi (after consultation).',
                isPremium: true,
                categories: [categoryMap['Cardiovascular']],
                ayurvedicApproach: [
                    "Balance Vata and Pitta doshas, which are often aggravated in hypertension.",
                    "Adopt a Kapha-pacifying diet, reducing salt, oily, and heavy foods; increase intake of potassium-rich foods like bananas and leafy greens.",
                    "Practice stress-reducing techniques such as yoga, meditation, and deep breathing.",
                    "Engage in regular, moderate exercise like walking or swimming.",
                    "Consider herbs like Sarpagandha, Arjuna (known for its cardioprotective properties), Ashwagandha (helps the body cope with stress), and Brahmi (after consultation).",
                    "Panchakarma therapies like Shirodhara and Abhyanga may be beneficial (under guidance). Consuming garlic and honey in moderation may also be helpful."
                ]
            },
            {
                solutionId: 'AS008',
                title: 'Diabetes (Madhumeha)',
                description: 'Balance Kapha dosha. Diet with whole grains, fiber, vegetables. Avoid sweets, processed foods. Bitter foods (Karela, Methi). Regular exercise. Consider Gudmar, Neem, Turmeric, Amla (after consultation). Stress management.',
                isPremium: true,
                categories: [categoryMap['Metabolic']],
                ayurvedicApproach: [
                    "Balance Kapha dosha, which is often dominant in diabetes.",
                    "Follow a diet with whole grains, fiber-rich foods, and plenty of vegetables; avoid excessive sweets, processed foods, and refined carbohydrates; incorporate bitter-tasting foods like bitter gourd (Karela) and fenugreek (Methi - contains soluble fiber, which aids in blood sugar control).",
                    "Practice regular exercise to improve insulin sensitivity.",
                    "Consider herbs like Gudmar (known as the 'sugar destroyer'), Neem, Turmeric (has anti-inflammatory and antioxidant properties), and Amla (after consultation).",
                    "Panchakarma therapies may be recommended for detoxification (under guidance).",
                    "Manage stress through yoga and meditation."
                ]
            },
            {
                solutionId: 'AS009',
                title: 'Respiratory Issues (Asthma, Bronchitis, Allergies)',
                description: 'Balance Kapha and Vata doshas. Kapha-pacifying diet (avoid cold, heavy, mucus-forming foods). Warm, light foods. Breathing exercises (Pranayama). Consider Tulsi, Vasa, Licorice, Ginger (after consultation). Steam inhalation. Nasya (nasal oils).',
                isPremium: false,
                categories: [categoryMap['Respiratory']],
                ayurvedicApproach: [
                    "Balance Kapha and Vata doshas, which are often involved in respiratory problems.",
                    "Follow a Kapha-pacifying diet, avoiding cold, heavy, and mucus-forming foods; favor warm, light, and easily digestible foods.",
                    "Practice breathing exercises (Pranayama) like Nadi Shodhana and Kapalabhati to improve lung capacity.",
                    "Consider herbs like Tulsi (has anti-inflammatory and anti-bacterial properties), Vasa (helps to dilate the bronchioles), Licorice root (Yashtimadhu - can soothe inflammation and expel mucus), and Ginger (after consultation).",
                    "Steam inhalation with eucalyptus or mint can help relieve congestion.",
                    "Nasya (nasal administration of medicated oils) may be beneficial for sinus and allergy issues.",
                    "Panchakarma therapies like Vamana (therapeutic vomiting) may be used in specific cases (under guidance)."
                ]
            },
            {
                solutionId: 'AS010',
                title: 'Chronic Fatigue Syndrome',
                description: 'Balance all three doshas (Vata for energy, Kapha to reduce heaviness). Easily digestible, nourishing foods. Adequate rest. Gentle yoga and movement. Consider Ashwagandha and Shatavari (after consultation). Warm oil Abhyanga. Detoxification therapies (under guidance).',
                isPremium: true,
                categories: [categoryMap['Chronic Fatigue']],
                ayurvedicApproach: [
                    "Focus on balancing all three doshas, particularly Vata (for energy flow) and Kapha (to reduce heaviness).",
                    "Prioritize easily digestible, nourishing foods to improve energy levels without taxing the system.",
                    "Ensure adequate rest and establish a regular sleep schedule.",
                    "Practice gentle yoga and mindful movement to improve circulation and reduce stagnation.",
                    "Consider adaptogenic herbs like Ashwagandha and Shatavari to support energy and resilience (after consultation).",
                    "Abhyanga with warming oils can help improve circulation and reduce fatigue.",
                    "Panchakarma therapies may be beneficial for detoxification and rejuvenation (under guidance)."
                ]
            },
            {
                solutionId: 'AS011',
                title: 'Headaches and Migraines',
                description: 'Identify dominant dosha (Vata or Pitta). Regular meal times. Hydration. Stress reduction. Cooling pastes (sandalwood, brahmi). Nasya with medicated oils. Herbs like Brahmi, Shankhapushpi, Guduchi (after consultation). Gentle head and neck massage.',
                isPremium: false,
                categories: [categoryMap['Headaches & Migraines']],
                ayurvedicApproach: [
                    "Identify the dominant dosha imbalance contributing to headaches (often Vata or Pitta).",
                    "Maintain regular meal times to prevent Vata aggravation.",
                    "Ensure adequate hydration.",
                    "Practice stress-reducing techniques like yoga and meditation.",
                    "Apply cooling pastes (like sandalwood or brahmi) to the forehead for Pitta-related headaches.",
                    "Consider Nasya with medicated oils to clear nasal passages and relieve pressure.",
                    "Herbs like Brahmi, Shankhapushpi, and Guduchi may be helpful (after consultation).",
                    "Gentle head and neck massage with cooling oils can provide relief."
                ]
            },
            {
                solutionId: 'AS012',
                title: 'Irritable Bowel Syndrome (IBS)',
                description: 'Balance Vata dosha. Light, easily digestible diet (avoid trigger foods). Spices like ginger, cumin, fennel. Warm water and herbal teas. Stress management. Consider Kutaja, Bilva, Psyllium husk (after consultation). Abdominal Abhyanga. Regular meal times.',
                isPremium: false,
                categories: [categoryMap['Irritable Bowel Syndrome']],
                ayurvedicApproach: [
                    "Focus on balancing Vata dosha, which governs movement in the body, including the digestive tract.",
                    "Follow a light, easily digestible diet, avoiding processed foods and known trigger foods.",
                    "Include spices like ginger, cumin, and fennel to aid digestion and reduce bloating.",
                    "Drink warm water and herbal teas (like ginger or chamomile).",
                    "Practice stress management techniques as stress can exacerbate IBS symptoms.",
                    "Consider herbs like Kutaja, Bilva, and Psyllium husk (Isabgol) after consultation.",
                    "Abhyanga, especially on the abdomen, can help soothe the digestive system.",
                    "Ensure regular meal times and avoid skipping meals."
                ]
            },
            {
                solutionId: 'AS013',
                title: 'Menstrual Issues (PMS, Irregular Cycles)',
                description: 'Balance Vata and Pitta doshas. Nourishing diet (iron, essential fatty acids). Adequate rest. Manage stress. Gentle exercise and yoga. Consider Ashoka, Shatavari, Lodhra (after consultation). Warm sesame oil Abhyanga. Specific yoga and breathing exercises.',
                isPremium: false,
                categories: [categoryMap['Menstrual Health']],
                ayurvedicApproach: [
                    "Balance Vata and Pitta doshas, which often play a role in menstrual imbalances.",
                    "Follow a nourishing diet, rich in iron and essential fatty acids.",
                    "Ensure adequate rest and manage stress levels.",
                    "Gentle exercise like walking and yoga can be beneficial.",
                    "Consider herbs like Ashoka, Shatavari, and Lodhra (after consultation).",
                    "Abhyanga with warm sesame oil can be soothing.",
                    "Specific yoga asanas and breathing exercises can help regulate the menstrual cycle."
                ]
            },
            {
                solutionId: 'AS014',
                title: 'Weight Management (Obesity)',
                description: 'Balance Kapha dosha. Kapha-pacifying diet (light, warm, digestible foods). Increase fruits, vegetables, whole grains. Reduce oily, fatty, sugary foods. Regular, brisk exercise. Consider Triphala, Guggulu, Garcinia Cambogia (after consultation). Warm water with lemon and honey. Mindful eating.',
                isPremium: false,
                categories: [categoryMap['Weight Management']],
                ayurvedicApproach: [
                    "Balance Kapha dosha, which is associated with heaviness and accumulation.",
                    "Adopt a Kapha-pacifying diet, emphasizing light, warm, and easily digestible foods.",
                    "Increase intake of fruits, vegetables, and whole grains.",
                    "Reduce consumption of oily, fatty, and sugary foods.",
                    "Engage in regular, brisk exercise.",
                    "Consider herbs like Triphala, Guggulu, and Garcinia Cambogia (after consultation).",
                    "Drink warm water with lemon and honey in the morning.",
                    "Practice mindful eating and avoid overeating or snacking between meals."
                ]
            },
            {
                solutionId: 'AS015',
                title: 'Hair Loss and Dandruff',
                description: 'Balance Pitta and Vata doshas. Regular scalp massage with warm oils (coconut, sesame, Bhringraj). Use of gentle, natural hair products. Consider herbs like Bhringraj, Amla, and Shikakai (for hair wash). Healthy diet rich in iron and protein. Manage stress.',
                isPremium: false,
                categories: [categoryMap['Hair Care']],
                ayurvedicApproach: [
                    "Balance Pitta (related to heat and inflammation) and Vata (related to dryness) doshas.",
                    "Regular scalp massage with warm oils like coconut, sesame, or Bhringraj to improve circulation.",
                    "Use gentle, natural hair cleansers and avoid harsh chemicals.",
                    "Consider hair packs made with herbs like Amla, Shikakai, and Reetha.",
                    "Ensure a diet rich in iron, zinc, and biotin.",
                    "Manage stress through yoga and meditation.",
                    "Consider internal herbs like Bhringraj and Amla (after consultation)."
                ]
            },
            {
                solutionId: 'AS016',
                title: 'Dry Eyes and Eye Strain',
                description: 'Balance Vata and Pitta doshas. Regular eye exercises. Triphala eyewash (sterile solution). Application of ghee to the eyelids. Avoid excessive screen time. Ensure adequate hydration. Consume foods rich in Vitamin A and Omega-3 fatty acids.',
                isPremium: false,
                categories: [categoryMap['Eye Health']],
                ayurvedicApproach: [
                    "Balance Vata (related to dryness) and Pitta (related to heat) doshas.",
                    "Practice regular eye exercises to improve circulation and reduce strain.",
                    "Consider a Triphala eyewash (using a sterile, diluted solution).",
                    "Applying a thin layer of ghee around the eyelids before sleep can be soothing.",
                    "Minimize prolonged exposure to screens and take regular breaks.",
                    "Ensure adequate hydration throughout the day.",
                    "Include foods rich in Vitamin A (carrots, leafy greens) and Omega-3 fatty acids (flaxseeds, walnuts) in your diet.",
                    "Consider internal herbs like Triphala and Amalaki (after consultation)."
                ]
            },
            {
                solutionId: 'AS017',
                title: 'General Detoxification',
                description: 'Balance all three doshas. Follow a light, easily digestible diet with plenty of fruits and vegetables. Drink warm water throughout the day. Practice gentle yoga and breathing exercises. Consider Triphala for bowel cleansing. Panchakarma therapies (under professional guidance).',
                isPremium: true,
                categories: [categoryMap['Detoxification']],
                ayurvedicApproach: [
                    "Focus on balancing all three doshas to support natural detoxification pathways.",
                    "Adopt a light, easily digestible diet, emphasizing fresh fruits, vegetables, and whole grains.",
                    "Drink plenty of warm water throughout the day to aid in flushing toxins.",
                    "Engage in gentle yoga and breathing exercises to stimulate circulation and elimination.",
                    "Consider the use of Triphala to support healthy bowel movements.",
                    "Undergo Panchakarma therapies (like Virechana - purgation or Basti - medicated enema) under the guidance of a qualified practitioner for deep detoxification.",
                    "Include detoxifying herbs like Neem and Turmeric in your diet (after consultation)."
                ]
            },
            {
                solutionId: 'AS018',
                title: 'Colic in Infants',
                description: 'Balance Vata dosha. Gentle abdominal massage with warm Vata-pacifying oil (like hing oil). Ensure proper feeding techniques. Mothers diet adjustments(avoiding gas- forming foods).Consider Gripe water(with caution and natural ingredients). Swaddling and gentle rocking.',
                isPremium: false,
                categories: [categoryMap["Children's Health"]],
                ayurvedicApproach: [
                    "Primarily focus on balancing the Vata dosha in the infant.",
                    "Perform gentle abdominal massage using warm Vata-pacifying oils, such as hing oil (asafoetida oil diluted in a carrier oil).",
                    "Ensure proper feeding techniques to minimize air swallowing.",
                    "The breastfeeding mother should adjust her diet to avoid gas-forming foods.",
                    "Consider giving gripe water made with natural ingredients in small amounts (with caution and after consulting a pediatrician or Ayurvedic practitioner).",
                    "Swaddling the infant snugly and gentle rocking can have a calming effect.",
                    "Certain carminative herbs like fennel or dill (in very mild formulations for infants, under guidance) may be considered."
                ]
            },
            {
                solutionId: 'AS019',
                title: 'Memory Enhancement in Older Adults',
                description: 'Balance Vata and Kapha doshas. Regular mental exercises (puzzles, reading). Consume brain-boosting foods like Brahmi, Shankhapushpi, and almonds. Ensure adequate sleep. Manage stress through meditation and gentle activities. Consider Brahmi Ghrita or Saraswatarishta (after consultation).',
                isPremium: true,
                categories: [categoryMap['Geriatric Health']],
                ayurvedicApproach: [
                    "Focus on balancing Vata (for cognitive function) and Kapha (to prevent stagnation) doshas.",
                    "Engage in regular mental exercises such as puzzles, reading, and learning new skills.",
                    "Include brain-boosting foods like almonds, walnuts, and ghee in the diet.",
                    "Consider the use of Ayurvedic herbs known for their cognitive benefits, such as Brahmi and Shankhapushpi (after consultation).",
                    "Ensure adequate and restful sleep to support memory consolidation.",
                    "Manage stress through meditation, gentle yoga, and enjoyable activities.",
                    "Ayurvedic formulations like Brahmi Ghrita or Saraswatarishta may be beneficial (after consultation)."
                ]
            },
            {
                solutionId: 'AS022',
                title: 'Eye Strain & Vision Weakness (Drishti Kshaya)',
                description: 'Balance Pitta (eye inflammation) and Vata (dryness). Use Triphala eyewash, consume Vitamin A-rich foods, and practice Netra Tarpana therapy.',
                isPremium: false,
                categories: [categoryMap['Eye Health']],
                ayurvedicApproach: [
                    "Balance Pitta (eye inflammation) and Vata (dryness)",
                    "Diet: Carrots, amla, leafy greens (rich in Vitamin A)",
                    "Ghee-infused with Triphala (1 tsp daily)",
                    "Herbs: Triphala eyewash (cooled decoction), Saptamrit Lauha",
                    "Lifestyle: Netra Tarpana (eye rejuvenation), palming exercises"
                ]
            },
            {
                solutionId: 'AS023',
                title: 'Varicose Veins (Siragranthi)',
                description: 'Balance Vata (circulation) with Gotu Kola and leg elevation. Avoid prolonged standing.',
                isPremium: false,
                categories: [categoryMap['Cardiovascular Health']],
                ayurvedicApproach: [
                    "Balance Vata (circulation) and Rakta (blood)",
                    "Diet: Pomegranate, cherries, garlic",
                    "Herbs: Gotu Kola (strengthens veins), Manjistha (blood purifier)",
                    "Lifestyle: Legs-up-the-wall pose, cold water splashes"
                ]
            },
            {
                solutionId: 'AS024',
                title: 'Thyroid Imbalance (Galaganda)',
                description: 'Hypothyroid: Balance Kapha. Hyperthyroid: Balance Pitta. Use Kanchanar Guggulu and neck massage.',
                isPremium: true,
                categories: [categoryMap['Metabolic Health']],
                ayurvedicApproach: [
                    "Hypothyroid: Balance Kapha",
                    "Hyperthyroid: Balance Pitta",
                    "Diet: Coconut, Brazil nuts (selenium)",
                    "Herbs: Kanchanar Guggulu, Brahmi",
                    "Lifestyle: Neck massage with mustard oil, Ujjayi pranayama"
                ]
            },
            {
                solutionId: 'AS025',
                title: 'Bad Breath (Mukha Daurgandhy)',
                description: 'Balance Pitta (digestive root cause) with neem twigs and oil pulling.',
                isPremium: false,
                categories: [categoryMap['Digestive Health']],
                ayurvedicApproach: [
                    "Balance Pitta (digestive root cause)",
                    "Diet: Chew fennel seeds post-meals",
                    "Herbs: Neem twig (natural toothbrush), Ela (cardamom)",
                    "Lifestyle: Tongue scraping, Gandusha (oil pulling)"
                ]
            },
            {
                solutionId: 'AS026',
                title: 'Sciatica (Gridhrasi)',
                description: 'Balance Vata (nerve inflammation) with Nirgundi oil and specific yoga postures.',
                isPremium: false,
                categories: [categoryMap['Joint Health']],
                ayurvedicApproach: [
                    "Balance Vata (nerve inflammation)",
                    "Diet: Warm sesame milk with turmeric",
                    "Herbs: Nirgundi oil (topical), Rasna (anti-inflammatory)",
                    "Lifestyle: Kati Basti (oil therapy), Pawanmuktasana"
                ]
            },
            {
                solutionId: 'AS027',
                title: 'Premature Graying (Palitya)',
                description: 'Balance Pitta (premature aging) with Bhringraj oil and amla juice.',
                isPremium: false,
                categories: [categoryMap['Hair Health']],
                ayurvedicApproach: [
                    "Balance Pitta (premature aging)",
                    "Diet: Black sesame seeds, amla juice",
                    "Herbs: Bhringaraj oil, Amla+hibiscus mask",
                    "Lifestyle: Reduce stress"
                ]
            },
            {
                solutionId: 'AS028',
                title: 'Motion Sickness (Gamana Visha)',
                description: 'Balance Vata (nausea) with ginger candy and Shatavari kalpa.',
                isPremium: false,
                categories: [categoryMap['Digestive Health']],
                ayurvedicApproach: [
                    "Balance Vata (nausea)",
                    "Diet: Ginger candy during travel",
                    "Herbs: Shatavari kalpa (calms nerves)",
                    "Lifestyle: Mint inhalation"
                ]
            },
            {
                solutionId: 'AS029',
                title: 'Cracked Heels (Pada Sphutana)',
                description: 'Balance Vata (dryness) with neem+mustard oil foot soaks.',
                isPremium: false,
                categories: [categoryMap['Skin Health']],
                ayurvedicApproach: [
                    "Balance Vata (dryness)",
                    "Diet: Hydrating foods (cucumber, melons)",
                    "Herbs: Neem+mustard oil foot soak",
                    "Lifestyle: Nighttime coconut oil massage"
                ]
            },
            {
                solutionId: 'AS030',
                title: 'Bedwetting (Shayya Mutra)',
                description: 'Balance Kapha (childhood cases) with cinnamon milk and bladder exercises.',
                isPremium: false,
                categories: [categoryMap["Children's Health"]],
                ayurvedicApproach: [
                    "Balance Kapha (childhood cases)",
                    "Diet: Cinnamon powder in warm milk",
                    "Herbs: Shilajit (mineral tonic)",
                    "Lifestyle: Bladder-strengthening exercises"
                ]
            }
        ];

        await Solution.insertMany(solutions);
        console.log('Database seeded with more Ayurvedic solutions');
        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
        mongoose.connection.close();
    }
};

seedData();
