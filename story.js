
/**
 * This file contains the stories and questions for the quiz game.
 * Each story is an object with the following properties:
 * - title: The title of the story
 * - fiction: A boolean indicating whether the story is fictional or non-fictional
 * - content: The text of the story
 * - questions: An array of 3 question objects
 * Each question object has the following properties:
 * - question: The text of the question
 * - options: An array of 4 possible answers
 * - answer: The correct answer
 */
const stories = [
    {
        title: 'The Accidental Breakthrough of Penicillin',
        fiction: false,
        content: `In 1928, Scottish bacteriologist Alexander Fleming made a serendipitous discovery when he noticed a mold growing on his staphylococcus culture plates. This mold, later identified as Penicillium notatum, inhibited bacterial growth. Although Fleming published his findings, the clinical potential of penicillin remained largely unrecognized until Howard Florey and Ernst Chain refined its extraction and tested it on human subjects. This antibiotic marked a turning point in medical history, saving countless lives across the globe.`,
        questions: [
            {
                question: 'Which genus of fungus was responsible for the earliest form of penicillin discovered by Fleming?',
                options: ['Aspergillus', 'Penicillium', 'Rhizopus', 'Candida'],
                answer: 'Penicillium'
            },
            {
                question: 'Who refined and successfully tested penicillin on human subjects after Fleming\'s initial discovery?',
                options: ['Chain and Florey', 'Marie and Pierre Curie', 'Edward Jenner', 'Robert Koch'],
                answer: 'Chain and Florey'
            },
            {
                question: 'In which year did Fleming observe the antibacterial effects of the mold that led to penicillin?',
                options: ['1928', '1918', '1942', '1935'],
                answer: '1928'
            }
        ]
    },
    {
        title: 'Unraveling the Double Helix',
        fiction: false,
        content: `In 1953, James Watson and Francis Crick proposed the double-helix model of DNA. Their groundbreaking work, featured in a now-famous one-page paper published in Nature, drew heavily on Rosalind Franklin\'s X-ray crystallography data obtained at King\'s College London, which provided crucial insights into DNA\'s helical structure. Despite Franklin\'s pivotal contributions, only Watson, Crick, and Maurice Wilkins received the Nobel Prize in Physiology or Medicine in 1962 for their discoveries regarding the molecular structure of nucleic acids.`,
        questions: [
            {
                question: 'Which technique was pivotal in revealing the helical structure of DNA in Rosalind Franklin\'s research?',
                options: ['Electron microscopy', 'Radioisotope tracing', 'X-ray crystallography', 'NMR spectroscopy'],
                answer: 'X-ray crystallography'
            },
            {
                question: 'In which scientific journal was the groundbreaking DNA structure paper by Watson and Crick published in April 1953?',
                options: ['Science', 'Nature', 'Cell', 'Proceedings of the National Academy of Sciences'],
                answer: 'Nature'
            },
            {
                question: 'Who shared the 1962 Nobel Prize in Physiology or Medicine with Francis Crick and James Watson?',
                options: ['Rosalind Franklin', 'Max Perutz', 'Maurice Wilkins', 'Erwin Chargaff'],
                answer: 'Maurice Wilkins'
            }
        ]
    },
    {
        title: 'The Manhattan Project: Dawn of the Atomic Age',
        fiction: false,
        content: `Launched during World War II, the Manhattan Project was a top-secret program aimed at harnessing nuclear fission to create an atomic bomb. Under the leadership of General Leslie Groves and physicist J. Robert Oppenheimer, scientists at Los Alamos Laboratory raced to develop the first nuclear device. Nicknamed “Gadget,” this device was successfully tested during the Trinity test on July 16, 1945. Earlier, in 1942, Enrico Fermi oversaw the first self-sustaining nuclear chain reaction at the University of Chicago, paving the way for the unprecedented power of atomic weapons and ushering in the atomic age.`,
        questions: [
            {
                question: 'What was the code name of the world\'s first nuclear device tested on July 16, 1945?',
                options: ['Gadget', 'Little Boy', 'Fat Man', 'Thin Man'],
                answer: 'Gadget'
            },
            {
                question: 'Which theoretical physicist served as the scientific director of Los Alamos during the Manhattan Project?',
                options: ['Enrico Fermi', 'Richard Feynman', 'J. Robert Oppenheimer', 'Hans Bethe'],
                answer: 'J. Robert Oppenheimer'
            },
            {
                question: 'Where did the first self-sustaining nuclear chain reaction occur?',
                options: ['Oak Ridge, Tennessee', 'Hanford Site, Washington', 'Los Alamos, New Mexico', 'University of Chicago'],
                answer: 'University of Chicago'
            }
        ]
    },
    {
        title: 'The Curious Case of Schrödinger\'s Cat',
        fiction: false,
        content: `In 1935, physicist Erwin Schrödinger devised a thought experiment to illustrate the paradoxical nature of quantum mechanics. In this scenario, a cat is placed in a sealed box with a radioactive atom that has a 50% chance of decaying and triggering a mechanism that releases poison, potentially killing the cat. According to quantum superposition, the cat exists in a state of being both alive and dead until the box is opened and the cat\'s fate is observed. This experiment highlights the concept of superposition and the role of observation in quantum systems.`,
        questions: [
            {
                question: 'What is the name of the physicist who proposed the thought experiment involving a cat in a sealed box?',
                options: ['Werner Heisenberg', 'Niels Bohr', 'Erwin Schrödinger', 'Max Planck'],
                answer: 'Erwin Schrödinger'
            },
            {
                question: 'What is the term for the quantum principle that allows the cat to exist in a superposition of alive and dead states?',
                options: ['Quantum entanglement', 'Wave-particle duality', 'Quantum superposition', 'Heisenberg uncertainty principle'],
                answer: 'Quantum superposition'
            },
            {
                question: 'What is the probability of the radioactive atom decaying and triggering the poison mechanism in Schrödinger\'s thought experiment?',
                options: ['25%', '50%', '75%', '100%'],
                answer: '50%'
            }
        ]
    },
    {
        title: 'The Enigma of Dark Matter',
        fiction: false,
        content: `Dark matter, a mysterious and elusive substance that does not emit, absorb, or reflect light, comprises about 27% of the universe\'s total mass-energy content. Despite its pervasive influence on cosmic structures, dark matter remains undetectable through electromagnetic radiation. Proposed as a solution to the missing mass problem in galaxies and the accelerated expansion of the universe, dark matter\'s composition and properties remain a subject of ongoing research and speculation in the field of astrophysics.`,
        questions: [
            {
                question: 'What percentage of the universe\'s mass-energy content is estimated to be composed of dark matter?',
                options: ['5%', '27%', '50%', '75%'],
                answer: '27%'
            },
            {
                question: 'Which phenomenon in galaxies and the universe led to the proposal of dark matter as a solution?',
                options: ['Redshift', 'Dark energy', 'Missing mass', 'Cosmic microwave background radiation'],
                answer: 'Missing mass'
            },
            {
                question: 'Why is dark matter considered “dark”?',
                options: ['It absorbs all light', 'It emits light', 'It reflects light', 'It does not interact with light'],
                answer: 'It does not interact with light'
            }
        ]
    }
];