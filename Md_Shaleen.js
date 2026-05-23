/* ==========================================================================
   MD SHALEEN - DATA ANALYST PORTFOLIO INTERACTIONS
   Features: Typewriter, Scroll Reveals, Filtering, Chart.js Sandbox, Tabs, Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Navbar Scrolling & Mobile Menu Toggle
    // ----------------------------------------------------------------------
    const header = document.getElementById('site-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-container');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    // Sticky Header Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollTopBtn.classList.remove('active');
        }
    });

    // Mobile Menu Toggle Click
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Animated burger transition
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        if (mobileMenuBtn.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars.forEach(bar => bar.style.transform = 'none');
            bars[1].style.opacity = '1';
        });
    });


    // ----------------------------------------------------------------------
    // 2. Hardware-Accelerated Intersection Observer for Scroll Reveals
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ----------------------------------------------------------------------
    // 3. Typewriter Effect
    // ----------------------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter-text');
    const roles = ["Data Analyst", "SQL Developer", "Power BI Analyst", "Business Intelligence Specialist"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // Delete faster
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80; // Normal typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before starting next word
        }

        setTimeout(handleTypewriter, typingSpeed);
    }
    
    // Start the typewriter loop
    handleTypewriter();


    // ----------------------------------------------------------------------
    // 4. Project Grid Category Filtering
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active button style
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const categoryFilter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (categoryFilter === 'all' || cardCategory === categoryFilter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // ----------------------------------------------------------------------
    // 5. Dual Embed & Simulator Tab Switching Logic
    // ----------------------------------------------------------------------
    window.switchSandboxTab = function(tabId) {
        const btnSim = document.getElementById('tab-btn-sim');
        const btnPbi = document.getElementById('tab-btn-pbi');
        const contentSim = document.getElementById('sb-content-simulator');
        const contentPbi = document.getElementById('sb-content-powerbi');

        if (tabId === 'simulator') {
            btnSim.classList.add('active');
            btnPbi.classList.remove('active');
            contentSim.classList.add('active');
            contentPbi.classList.remove('active');
        } else {
            btnPbi.classList.add('active');
            btnSim.classList.remove('active');
            contentPbi.classList.add('active');
            contentSim.classList.remove('active');
            
            // Check if iframe loaded successfully, otherwise show elegant fallback trigger
            const pbiFrame = document.getElementById('pbi-embed-frame');
            const fallbackMsg = document.getElementById('pbi-fallback-msg');
            
            pbiFrame.onerror = function() {
                fallbackMsg.classList.add('active');
            };
        }
    };


    // ----------------------------------------------------------------------
    // 6. Live Dynamic Chart Sandbox (Chart.js Integration)
    // ----------------------------------------------------------------------
    const ctx = document.getElementById('sandboxChart').getContext('2d');
    let sandboxChartInstance = null;

    // Simulated Datasets with crisp corporate styling & outcome alignments
    const sandboxDatasets = {
        sales: {
            label: "Monthly Sales Revenue (INR in Thousands)",
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            data: [250, 310, 280, 390, 420, 380, 480, 510, 460, 580, 620, 680],
            bgColor: 'rgba(0, 119, 182, 0.1)',
            borderColor: '#0077b6',
            statTitle1: "Total Sales Revenue",
            statVal1: "₹4.95M",
            statTitle2: "Avg Order Value (AOV)",
            statVal2: "₹2,640",
            desc: "<strong>Sales Trend Dashboard:</strong> Plotting monthly e-commerce orders, total transactional revenue, and Average Order Value (AOV) trends. Stage-managed and aggregated using optimized SQL databases to identify a **22% monthly sales growth**.",
            viewName: "E-Commerce Insights (Enterprise SQL View)"
        },
        healthcare: {
            label: "Department Patient Throughput",
            labels: ["General Med", "Pediatrics", "Cardiology", "Orthopedics", "Neurology", "Outpatient Care"],
            data: [420, 290, 180, 210, 110, 340],
            bgColor: 'rgba(0, 180, 216, 0.15)',
            borderColor: '#00b4d8',
            statTitle1: "Total Patient Flow",
            statVal1: "12,480",
            statTitle2: "Clinical Utilization",
            statVal2: "88.6%",
            desc: "<strong>Healthcare Operations Dashboard:</strong> Monitoring department workloads, outpatient volumes, and utilization thresholds. Built with custom Power BI DAX formulas and Power Query ETL schema cleaning to **boost data consistency by 25%**.",
            viewName: "Healthcare Operations (Interactive BI View)"
        }
    };

    // Initialize Chart function
    function initSandboxChart(type, dataset) {
        if (sandboxChartInstance) {
            sandboxChartInstance.destroy();
        }

        // Apply global configuration overrides for cyber dark theme
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Inter', sans-serif";

        const config = {
            type: type,
            data: {
                labels: dataset.labels,
                datasets: [{
                    label: dataset.label,
                    data: dataset.data,
                    backgroundColor: dataset.bgColor,
                    borderColor: dataset.borderColor,
                    borderWidth: 2,
                    tension: 0.35,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#f8fafc',
                            boxWidth: 12,
                            font: {
                                size: 11,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0f1524',
                        titleColor: '#00b4d8',
                        bodyColor: '#f8fafc',
                        borderColor: 'rgba(255,255,255,0.06)',
                        borderWidth: 1,
                        padding: 10
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(255,255,255,0.02)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        };

        sandboxChartInstance = new Chart(ctx, config);
    }

    // Dataset Switcher Action
    window.switchSandboxDataset = function(type) {
        const btnSales = document.getElementById('sb-btn-sales');
        const btnHealth = document.getElementById('sb-btn-health');
        
        const statName1 = document.getElementById('sb-stat-name-1');
        const statVal1 = document.getElementById('sb-stat-val-1');
        const statName2 = document.getElementById('sb-stat-name-2');
        const statVal2 = document.getElementById('sb-stat-val-2');
        
        const activeLabel = document.getElementById('sb-active-view-name');
        const descText = document.getElementById('sb-dataset-desc');

        if (type === 'sales') {
            btnSales.classList.add('active');
            btnHealth.classList.remove('active');
            
            const dataset = sandboxDatasets.sales;
            initSandboxChart('line', dataset);

            // Update stats & text
            statName1.textContent = dataset.statTitle1;
            statVal1.textContent = dataset.statVal1;
            statName2.textContent = dataset.statTitle2;
            statVal2.textContent = dataset.statVal2;
            
            activeLabel.textContent = dataset.viewName;
            descText.innerHTML = dataset.desc;
        } else {
            btnHealth.classList.add('active');
            btnSales.classList.remove('active');
            
            const dataset = sandboxDatasets.healthcare;
            initSandboxChart('bar', dataset); // Bar chart for outpatient counts

            // Update stats & text
            statName1.textContent = dataset.statTitle1;
            statVal1.textContent = dataset.statVal1;
            statName2.textContent = dataset.statTitle2;
            statVal2.textContent = dataset.statVal2;
            
            activeLabel.textContent = dataset.viewName;
            descText.innerHTML = dataset.desc;
        }
    };

    // Load initial sales line chart
    initSandboxChart('line', sandboxDatasets.sales);


    // ----------------------------------------------------------------------
    // 7. Dynamic Project Modal Details Popups (Outcome Metrics & Recruiter appeal)
    // ----------------------------------------------------------------------
    const projectDetailsData = {
        'habit-tracker': {
            title: "SQL Habit Tracker / Life RPG Analytics System",
            tech: "MySQL | Advanced Excel Staging & Modeling",
            badge: "Relational Database Design Case Study",
            intro: "Designed and engineered a normalized relational database in MySQL following strict 3NF principles, linked with an Advanced Excel analytical reporting dashboard to track completion rates, streak consistency, and user engagement metrics.",
            bullets: [
                "<strong>3NF Relational Database:</strong> Designed a normalized database with 5+ interconnected tables for users, habits, streak logs, progress tracking, and rewards management following strict 3NF principles to ensure complete database integrity.",
                "<strong>Excel Productivity Staging:</strong> Built a comprehensive Excel-based habit tracking and productivity monitoring system with automated calculations, conditional formatting, and visual summaries for real-time progress insights.",
                "<strong>Advanced SQL Analytics:</strong> Developed analytical SQL queries to calculate completion rates, weekly productivity trends, streak consistency, and engagement performance metrics across multiple dimensions.",
                "<strong>Behavioral Trend Analysis:</strong> Performed behavioral trend analysis to identify active vs. inactive habits using date-based logic and performance metrics, achieving a proven <strong>85% user engagement rate</strong>.",
                "<strong>Leaderboard Gamification:</strong> Created leaderboard-style business insights including most consistent users, highest completion rates, and top-performing habits to gamify and drive productivity improvement."
            ]
        },
        'ecommerce': {
            title: "E-Commerce Sales Analytics Project",
            tech: "MySQL Relational Analytics",
            badge: "Enterprise Business Intelligence Case Study",
            intro: "An analytical database project built in MySQL, structuring e-commerce operations. It handles product catalogs, customers, orders, and transactions, solving critical business queries to support data-driven decision-making.",
            bullets: [
                "<strong>Relational Database Integrity:</strong> Designed and structured normalized relational databases for customers, products, orders, and transactions with proper constraints and keys to ensure absolute data integrity.",
                "<strong>Large-Scale Data Analytics:</strong> Developed complex SQL queries to analyze total revenue, Average Order Value (AOV), and customer purchasing patterns across <strong>10,000+ transactional records</strong>.",
                "<strong>Revenue Growth Metrics:</strong> Tracked purchasing patterns and city-wise sales trends using advanced SQL aggregates, reporting a <strong>22% monthly sales growth</strong>.",
                "<strong>Category Contribution:</strong> Identified high-performing products contributing directly to <strong>65% of total business revenue</strong> and highlighted low-performing categories requiring strategic intervention.",
                "<strong>SQL Business Solving:</strong> Solved 15+ business-focused analytical questions using advanced SQL logic, JOINs, subqueries, CTEs, and filtering to support executive decision-making."
            ]
        },
        'healthcare': {
            title: "Healthcare Analytics Dashboard",
            tech: "Power BI Desktop | Power Query ETL | DAX Formulas",
            badge: "Power BI BI Reporting Dashboard",
            intro: "Developed an interactive clinical operations dashboard in Power BI. Staged healthcare datasets in Power Query using ETL, and modeled operational metrics with DAX supporting management-level resource allocation.",
            bullets: [
                "<strong>KPI Operations Portal:</strong> Built an interactive healthcare dashboard monitoring patient trends, department performance, bed occupancy rates, ER waiting times, and treatment analysis across <strong>8+ strategic KPIs</strong>.",
                "<strong>Power Query ETL Pipelines:</strong> Cleaned and transformed healthcare datasets using Power Query ETL processes, improving reporting quality and analytical consistency by <strong>25%</strong>.",
                "<strong>DAX Performance Modeling:</strong> Developed KPI-based visual reports and complex DAX measures supporting operational analysis and management-level reporting for resource allocation.",
                "<strong>Dynamic Navigation Canvas:</strong> Designed modern dashboard layouts with synchronized slicers and drill-down functionality for department-wise and time-based analysis, enabling data-driven operational improvements."
            ]
        },
        'sales': {
            title: "Sales Performance Dashboard",
            tech: "SQL ETL | Excel Prep | Power BI Visualization",
            badge: "Multi-Source Analytics Dashboard",
            intro: "Staged an integrated analytics pipeline extracting raw inventory lists and regional sales figures. Cleaned schemas in Excel, validated data, and mapped regional progression targets within corporate Power BI reports.",
            bullets: [
                "<strong>Multi-Source Data Cleaning:</strong> Cleaned, transformed, and validated raw sales data from multiple sources using SQL and Excel before visualization in Power BI, ensuring <strong>99% data accuracy</strong>.",
                "<strong>Executive Trend Analysis:</strong> Built interactive dashboards analyzing sales performance by region, category, and time period, identifying <strong>18% year-over-year sales growth</strong> in top-performing regions.",
                "<strong>Performance Intelligence:</strong> Created business KPIs and trend-based visualizations to identify sales growth opportunities and underperforming segments requiring targeted marketing strategies."
            ]
        }
    };

    const modal = document.getElementById('project-details-modal');
    const modalContent = document.getElementById('modal-content-area');

    window.openProjectModal = function(projectId) {
        const data = projectDetailsData[projectId];
        if (!data) return;

        // Construct HTML content
        let bulletsHtml = '';
        data.bullets.forEach(bullet => {
            bulletsHtml += `<li>${bullet}</li>`;
        });

        modalContent.innerHTML = `
            <div class="m-title-area">
                <span class="m-badge">${data.badge}</span>
                <h2>${data.title}</h2>
                <div class="m-tech-stack"><i class="fa-solid fa-layer-group"></i> Technologies: ${data.tech}</div>
            </div>
            
            <div class="m-body">
                <p>${data.intro}</p>
                
                <h4 class="m-section-title"><i class="fa-solid fa-list-check"></i> Project Implementations &amp; Outcomes:</h4>
                <ul class="m-bullets">
                    ${bulletsHtml}
                </ul>
            </div>
            
            <div class="m-footer">
                <button class="btn btn-secondary" onclick="closeProjectModal()">Close Overview</button>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page background scroll
    };

    window.closeProjectModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable background scroll
    };

    // Close modal when clicking outside the box
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });


    // ----------------------------------------------------------------------
    // 8. Interactive Contact Form Client Validation & Mock Submission
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    const successFeedback = document.getElementById('form-feedback-success');
    const submitBtn = document.getElementById('form-submit-btn');

    window.handleContactSubmit = function(event) {
        event.preventDefault(); // Stop page reload

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        // Simple validation checks
        if (!nameInput.value.trim() || !emailInput.value.trim() || !subjectInput.value.trim() || !messageInput.value.trim()) {
            alert('Please fill in all the contact form fields.');
            return;
        }

        // Change button state to "Sending..."
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('span');
        const btnIcon = submitBtn.querySelector('i');
        
        btnText.textContent = "Submitting Message...";
        btnIcon.className = "fa-solid fa-spinner fa-spin";

        // Simulate network API delay (1.2 seconds)
        setTimeout(() => {
            // Hide form and display success card
            contactForm.style.opacity = '0.1';
            successFeedback.style.display = 'flex';
            
            // Log local simulated output to browser console
            console.log("Simulated Contact form submission success!", {
                Name: nameInput.value,
                Email: emailInput.value,
                Subject: subjectInput.value,
                Message: messageInput.value
            });

            // Reset button and form after success
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.opacity = '1';
                successFeedback.style.display = 'none';
                
                submitBtn.disabled = false;
                btnText.textContent = "Submit Message";
                btnIcon.className = "fa-regular fa-paper-plane";
            }, 6000); // Reset UI back to normal after 6 seconds
            
        }, 1200);
    };

    // ----------------------------------------------------------------------
    // 9. Scroll Top Button Action
    // ----------------------------------------------------------------------
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
});
