// Applied Philosophy - Main JavaScript
// This script is loaded dynamically after all sections are fetched

(function initializeInteractivity() {

    // --- 1. Accordion Toggle Logic (for all sections) ---
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const elaboration = button.nextElementSibling;
            const isShown = elaboration.classList.toggle('show');
            if (!isShown) {
                button.textContent = button.textContent.includes('Q&A') ? 'Show Q&A ▼' : (button.textContent.includes('Analyze') ? 'Analyze the Case' + (button.textContent.includes('s') ? 's' : '') + ' ▼' : 'Elaborate ▼');
            } else {
                button.textContent = button.textContent.includes('Q&A') ? 'Hide Q&A ▲' : (button.textContent.includes('Analyze') ? 'Hide Analysis ▲' : 'Collapse ▲');
            }
        });
    });

    // --- 2. Sticky Nav Scroll Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', onScroll);

    // --- 3. Modern Philosophy: Rationalism vs. Empiricism Table ---
    const tableRows = document.querySelectorAll('.table-row');
    const detailsBox = document.getElementById('details-box');
    let lastSelectedRow = null;

    const detailsContent = {
        knowledge: {
            title: 'On the Source of Knowledge',
            descartes: `A true rationalist, Descartes believed that reason is the only path to certain knowledge. As "Sophie's World" explains, he could not trust his senses, which could be as deceptive as a dream. True knowledge had to be built upon a foundation of indubitable truths accessible only to the intellect, like the truths of mathematics.`,
            hume: `Hume argued that the mind is empty until filled by experience. "Sophie's World" notes his belief that everything we know is composed of 'impressions' (direct sensations) and 'ideas' (faint copies of impressions). If an idea cannot be traced back to a specific sense impression, it is a false idea.`
        },
        mind: {
            title: 'On the Mind at Birth',
            descartes: `Descartes argued that we are born with innate ideas, or 'blueprints,' placed in our minds by God. These include concepts like God, perfection, and geometric shapes. Our reason allows us to 'unpack' these ideas without ever needing to rely on the unreliable outside world.`,
            hume: `Hume championed the idea of the mind as a 'tabula rasa' or blank slate. As "Sophie's World" puts it, "Hume wanted to return to man's spontaneous experience of the world." There are no innate ideas; every thought, belief, and concept is built up from the raw material of sensory experience.`
        },
        senses: {
            title: 'On the Role of the Senses',
            descartes: `The senses are the great deceivers. Descartes pointed out that a stick in water looks bent, but our reason tells us it is straight. Therefore, sensory information must always be subject to the higher authority of rational thought. It cannot be the foundation of knowledge.`,
            hume: `For Hume, the senses are everything. They are our only connection to reality. All the contents of our mind, no matter how complex, are ultimately derived from what we have seen, heard, touched, tasted, or smelled. There is no 'knowledge' beyond what the senses provide.`
        },
        foundation: {
            title: 'On the Path to Certainty',
            descartes: `Descartes' method was to systematically doubt everything until he found one thing that could not be doubted: the act of doubting itself. This led to his famous "Cogito, ergo sum" ("I think, therefore I am"), which became the unshakable foundation for his entire philosophy.`,
            hume: `Hume believed certainty was an illusion. Knowledge is built by combining simple sense impressions into complex ideas. "Sophie's World" explains his skepticism about concepts like 'causality'—we only see one event following another, we don't 'see' the cause. Our belief is a habit of the mind, not a certainty.`
        }
    };

    if (tableRows.length > 0 && detailsBox) {
        tableRows.forEach(row => {
            row.addEventListener('click', () => {
                const concept = row.dataset.concept;

                if (lastSelectedRow === row) {
                    detailsBox.classList.add('hidden');
                    row.classList.remove('selected-row');
                    lastSelectedRow = null;
                    return;
                }

                if (lastSelectedRow) {
                    lastSelectedRow.classList.remove('selected-row');
                }

                row.classList.add('selected-row');
                lastSelectedRow = row;

                const content = detailsContent[concept];
                detailsBox.innerHTML = `
                    <h4 class="font-bold text-lg mb-2 text-gray-800">${content.title}</h4>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <h5 class="font-semibold text-rose-600 mb-1">Descartes (Rationalist View)</h5>
                            <p class="text-sm text-gray-700">${content.descartes}</p>
                        </div>
                        <div>
                            <h5 class="font-semibold text-sky-600 mb-1">Hume (Empiricist View)</h5>
                            <p class="text-sm text-gray-700">${content.hume}</p>
                        </div>
                    </div>
                `;
                detailsBox.classList.remove('hidden');
            });
        });
    }

    // --- 4. Contemporary: Freud's Structural (Iceberg) Model ---
    const freudComponents = document.querySelectorAll('.freud-component');
    const freudDisplay = document.getElementById('freud-display');
    if (freudComponents.length > 0 && freudDisplay) {
        freudComponents.forEach(component => {
            component.addEventListener('click', () => {
                freudDisplay.textContent = component.dataset.text;
            });
        });
    }

    // --- 5. Contemporary: Freud's Psychogenetic (Stages) Model ---
    const stageButtons = document.querySelectorAll('.stage-btn');
    const stageDisplay = document.getElementById('stage-display');

    const stageContent = {
        oral: {
            title: 'Oral Stage (Birth to 18 months)',
            zone: 'Mouth (sucking, biting)',
            conflict: 'Weaning from breast or bottle. Developing trust vs. dependence.',
            fixation: 'Overeating, smoking, nail-biting, sarcasm, dependency.'
        },
        anal: {
            title: 'Anal Stage (18 months to 3 years)',
            zone: 'Anus (retention and expulsion)',
            conflict: 'Toilet training. Learning self-control and autonomy vs. parental control.',
            fixation: 'Anal-retentive (neatness, stinginess, rigidity) or Anal-expulsive (messiness, rebelliousness).'
        },
        phallic: {
            title: 'Phallic Stage (3 to 5 years)',
            zone: 'Genitals',
            conflict: 'Oedipus/Electra complex; desire for opposite-sex parent and rivalry with same-sex parent.',
            fixation: 'Problems with authority, sexual anxiety, vanity, difficulty with stable relationships.'
        },
        latency: {
            title: 'Latency Stage (6 to 12 years)',
            zone: 'Sexual impulses are latent/dormant.',
            conflict: 'Focus on socialization, learning skills, and same-sex friendships.',
            fixation: 'Freud believed fixation is rare here; issues usually reflect earlier unresolved conflicts.'
        },
        genital: {
            title: 'Genital Stage (13 years to adult)',
            zone: 'Genitals (mature sexuality)',
            conflict: 'Reawakening of sexual interests in the context of mature relationships. Balancing love and work.',
            fixation: 'If earlier stages are unresolved, difficulty in forming mature, healthy relationships.'
        }
    };

    function updateStageDisplay(stageKey) {
        if (!stageDisplay) return;
        const content = stageContent[stageKey];
        stageDisplay.innerHTML = `
            <h4 class="font-bold text-base mb-2 text-gray-800">${content.title}</h4>
            <p><strong>Erogenous Zone:</strong> ${content.zone}</p>
            <p><strong>Main Conflict:</strong> ${content.conflict}</p>
            <p><strong>Potential Fixation Traits:</strong> ${content.fixation}</p>
        `;

        stageButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.stage === stageKey) {
                button.classList.add('active');
            }
        });
    }

    if (stageButtons.length > 0 && stageDisplay) {
        stageButtons.forEach(button => {
            button.addEventListener('click', () => {
                updateStageDisplay(button.dataset.stage);
            });
        });
        updateStageDisplay('oral');
    }

    // --- 6. Contemporary: Sartre's "Modes of Being" ---
    const sartreModeButtons = document.querySelectorAll('.sartre-btn-mode');
    const sartreDisplay = document.getElementById('sartre-display');

    const sartreContent = {
        'in-itself': '<strong>Being-in-itself (en-soi):</strong> This refers to the existence of non-conscious objects, like a rock or a table. They simply *are*. They have a fixed, solid essence, lack freedom, and cannot change what they are. They are full of being, with no potential to be otherwise.',
        'for-itself': '<strong>Being-for-itself (pour-soi):</strong> This is the mode of existence for conscious beings, like humans. It is defined by freedom, a lack of fixed essence, and the constant possibility of change. We are aware of ourselves, and through our choices, we create who we are. We are a "nothingness" that must constantly define itself.',
        'for-others': '<strong>Being-for-others (pour-autrui):</strong> This mode of being arises when we become aware that we are being observed by another consciousness (The "Look" of the Other). We experience ourselves as an object in their world, which can lead to feelings of shame or pride. This shapes our identity and can limit our freedom as we begin to see ourselves through others\' eyes.'
    };

    if (sartreModeButtons.length > 0 && sartreDisplay) {
        sartreModeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.dataset.mode;
                sartreDisplay.innerHTML = sartreContent[mode];
                sartreModeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // --- 7. Abortion: Pro-Life/Pro-Choice Toggle ---
    const stanceToggle = document.getElementById('stance-toggle');
    const argumentDisplay = document.getElementById('argument-display');
    const proLifeLabel = document.getElementById('pro-life-label');
    const proChoiceLabel = document.getElementById('pro-choice-label');

    const proLifeArgs = `
        <h4 class="font-semibold text-blue-600 mb-2">Pro-Life Arguments</h4>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Sanctity of Life:</strong> Human life is sacred from conception to natural death. Abortion is the termination of a human life and is therefore morally wrong.</li>
            <li><strong>Potential Personhood:</strong> A fetus has the potential to become a person with full rights, consciousness, and experiences. This potential grants it a right to life from the start.</li>
            <li><strong>Sentience Criterion:</strong> If a fetus can feel pain (which some argue can happen at various stages of development), it is morally wrong to cause it suffering and death.</li>
        </ul>`;

    const proChoiceArgs = `
        <h4 class="font-semibold text-red-600 mb-2">Pro-Choice Arguments</h4>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Bodily Autonomy:</strong> A woman has the fundamental right to control her own body and make decisions about her reproductive health.</li>
            <li><strong>Undesirable Consequences of Prohibition:</strong> Banning abortion does not stop it; it leads to unsafe, illegal abortions, harming women's health and increasing social inequality.</li>
            <li><strong>Fetal Personhood:</strong> A fetus is not yet a "person" with the same moral and legal rights as a woman. The woman's right to life, health, and well-being takes precedence.</li>
        </ul>`;

    function updateStanceDisplay() {
        if (stanceToggle && stanceToggle.checked) {
            argumentDisplay.innerHTML = proChoiceArgs;
            proChoiceLabel.classList.remove('text-gray-400');
            proChoiceLabel.classList.add('text-red-600');
            proLifeLabel.classList.add('text-gray-400');
            proLifeLabel.classList.remove('text-blue-600');
        } else if (argumentDisplay) {
            argumentDisplay.innerHTML = proLifeArgs;
            proLifeLabel.classList.remove('text-gray-400');
            proLifeLabel.classList.add('text-blue-600');
            proChoiceLabel.classList.add('text-gray-400');
            proChoiceLabel.classList.remove('text-red-600');
        }
    }

    if (stanceToggle && argumentDisplay) {
        stanceToggle.addEventListener('change', updateStanceDisplay);
        updateStanceDisplay();
    }

    // --- 8. Ethics Tab Logic (for Poverty & Euthanasia) ---
    const ethicsTabs = document.querySelectorAll('.ethics-tab');

    if (ethicsTabs.length > 0) {
        ethicsTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabGroup = tab.closest('.content-card');

                tabGroup.querySelectorAll('.ethics-tab').forEach(item => item.classList.remove('active'));
                tab.classList.add('active');

                const targetId = `ethics-${tab.dataset.tab}`;

                tabGroup.querySelectorAll('.ethics-content').forEach(content => {
                    if (content.id === targetId) {
                        content.classList.remove('hidden');
                    } else {
                        content.classList.add('hidden');
                    }
                });
            });
        });
    }



    console.log('Applied Philosophy interactivity initialized successfully!');
})();

