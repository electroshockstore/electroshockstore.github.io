# Implementation Plan

- [x] 1. Extend product data models with compatibility fields

  - Add compatibility object to all product categories (CPU, Motherboard, RAM, GPU, PSU, Case)
  - Populate socket, chipset, tipo_ram, form_factor, consumo_watts, longitud_mm fields
  - Add uso_principal tags for recommendation engine
  - Create performance tier classification data
  - _Requirements: 10.2, 10.3_



- [x] 1.1 Write property test for data model completeness
  - **Property 2: RAM Type Consistency**
  - **Validates: Requirements 3.3, 11.3**

- [x] 2. Create PC Builder context and state management


  - Implement PCBuilderContext with React Context API
  - Define PCBuild state structure (cpu, motherboard, ram, gpu, psu, storage, case, cooling)
  - Create actions: selectComponent, removeComponent, setMode, clearConfiguration
  - Add assistedAnswers state for guided mode
  - Implement totalPrice calculation
  - _Requirements: 5.3, 5.4, 9.4_

- [ ] 2.1 Write property test for price calculation
  - **Property 9: Price Calculation Accuracy**
  - **Validates: Requirements 4.2, 9.4**

- [ ] 2.2 Write property test for component replacement
  - **Property 13: Component Replacement Idempotence**
  - **Validates: Requirements 5.5**

- [ ] 3. Implement CompatibilityEngine core validation logic
  - Create checkCompatibility function with PCBuild and candidate product parameters
  - Implement socket validation rule (CPU.socket === Motherboard.socket)
  - Implement RAM type validation (CPU.memoriaRAM === Motherboard.tipoMemoriaRAM === RAM.tipo)
  - Implement form factor validation (Motherboard.factorDeForma in Case.formFactorSupport)
  - Implement power consumption validation (sum * 1.2 <= PSU.capacidad_watts)
  - Implement physical dimension validation (GPU.longitud_mm <= Case.maxGPULength_mm)
  - Implement chipset compatibility validation
  - Return CompatibilityResult with status (green/yellow/red) and reasons
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

- [ ] 3.1 Write property test for socket compatibility
  - **Property 1: Socket Compatibility Invariant**
  - **Validates: Requirements 3.2, 11.2**

- [ ] 3.2 Write property test for RAM type consistency
  - **Property 2: RAM Type Consistency**
  - **Validates: Requirements 3.3, 11.3**

- [ ] 3.3 Write property test for power budget
  - **Property 3: Power Budget Sufficiency**
  - **Validates: Requirements 3.4, 11.5**

- [ ] 3.4 Write property test for physical dimensions
  - **Property 4: Physical Dimension Compatibility**
  - **Validates: Requirements 3.5, 11.6**

- [ ] 3.5 Write property test for form factor
  - **Property 5: Form Factor Compatibility**
  - **Validates: Requirements 11.4**

- [ ] 3.6 Write property test for compatibility status completeness
  - **Property 7: Compatibility Status Completeness**
  - **Validates: Requirements 6.1, 6.2, 11.7**

- [ ] 4. Implement bottleneck detection system
  - Create performance tier classification for CPUs and GPUs
  - Implement detectBottleneck function comparing component tiers
  - Generate warnings for high-tier GPU with low-tier CPU
  - Generate warnings for high-tier CPU with low-tier GPU
  - Return bottleneck severity (none/minor/high) and suggestions
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 4.1 Write property test for bottleneck detection
  - **Property 15: Bottleneck Detection Symmetry**
  - **Validates: Requirements 12.1, 12.4**

- [ ] 5. Create RecommendationEngine for assisted mode
  - Implement generateRecommendation function with budget and usage criteria
  - Filter products by budget range
  - Filter by uso_principal matching user's usage
  - Implement selectOptimalCPU based on usage priority and budget
  - Implement selectOptimalGPU based on remaining budget
  - Select compatible Motherboard (socket + chipset match)
  - Select compatible RAM (type match + appropriate capacity)
  - Calculate total power consumption
  - Select PSU with 20% overhead
  - Select Case that fits motherboard form factor and GPU length
  - Validate entire configuration before returning
  - _Requirements: 2.5, 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 5.1 Write property test for budget constraint
  - **Property 6: Budget Constraint Adherence**
  - **Validates: Requirements 3.1**

- [ ] 5.2 Write property test for recommendation completeness
  - **Property 12: Recommendation Completeness**
  - **Validates: Requirements 1.5, 2.5**

- [ ] 6. Build ModeSelector component
  - Create component with two prominent buttons
  - Add "Ayúdame a armar mi PC (Recomendado para principiantes)" button
  - Add "Armar PC manualmente (Para expertos)" button
  - Implement onClick handlers to set mode in context
  - Style with clear visual differentiation
  - _Requirements: 1.1_

- [ ] 7. Implement AssistedMode question flow
  - Create QuestionFlow component with step progression
  - Implement BudgetQuestion with predefined price ranges
  - Implement UsageQuestion with options (Gaming, Trabajo, Multimedia, General)
  - Implement conditional GamingDetailsQuestion (resolution, FPS) when usage is Gaming
  - Store answers in assistedAnswers state
  - Add navigation buttons (Next, Back)
  - _Requirements: 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4_

- [ ] 7.1 Write property test for answer storage
  - **Property 11: Answer Storage Completeness**
  - **Validates: Requirements 1.4**

- [ ] 8. Create RecommendationSummary component
  - Display all recommended components with images and names
  - Show total price prominently
  - Add "Ajustar manualmente" button to transition to manual mode
  - Implement transition that loads recommendation into pcBuild
  - Show compatibility badges (all green for recommendations)
  - _Requirements: 1.5, 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 8.1 Write property test for mode transition
  - **Property 19: Mode Transition State Preservation**
  - **Validates: Requirements 4.4, 4.5**

- [ ] 9. Build ManualMode component structure
  - Create CategorySelector with all component categories
  - Implement category navigation (CPU, Motherboard, RAM, GPU, PSU, Storage, Case, Cooling)
  - Add visual indicators for completed categories
  - Style to match existing Store UI patterns
  - _Requirements: 5.1_

- [ ] 10. Implement ComponentList with traffic light system
  - Create ComponentCard component for each product
  - Calculate compatibility status (green/yellow/red) for each component
  - Apply visual indicators using color coding
  - Disable selection for red (incompatible) components
  - Show warning icon for yellow (bottleneck) components
  - Implement onClick handler to select component
  - _Requirements: 5.2, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1_

- [ ] 10.1 Write property test for traffic light correctness
  - **Property 8: Traffic Light Correctness**
  - **Validates: Requirements 6.3, 6.5, 7.1**

- [ ] 10.2 Write property test for category completeness
  - **Property 20: Category Product Completeness**
  - **Validates: Requirements 5.2**

- [ ] 11. Create CompatibilityTooltip component
  - Implement hover tooltip for incompatible (red) components
  - Display specific technical reasons for incompatibility
  - Format socket mismatch messages with actual socket values
  - Format power deficit messages with wattage calculations
  - Format dimension issues with mm measurements
  - Style tooltip for readability
  - _Requirements: 7.2, 7.3, 7.4, 7.5_

- [ ] 11.1 Write property test for incompatibility reasons
  - **Property 18: Incompatibility Reason Specificity**
  - **Validates: Requirements 7.3, 7.4, 7.5**

- [ ] 12. Build persistent SummaryPanel component
  - Create fixed/sticky panel visible in all modes
  - Display list of selected components with thumbnails
  - Show component names and individual prices
  - Calculate and display total price
  - Implement remove component button for each item
  - Add "Guardar configuración" button
  - Add "Limpiar todo" button
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 12.1 Write property test for summary synchronization
  - **Property 14: Summary Panel Synchronization**
  - **Validates: Requirements 9.2, 9.5**

- [ ] 13. Implement configuration save/load functionality
  - Create saveConfiguration function that generates unique ID
  - Encode pcBuild state into URL-safe string
  - Update browser URL with configuration parameter
  - Implement loadConfiguration function to parse URL
  - Decode configuration and restore pcBuild state
  - Add error handling for invalid configuration strings
  - _Requirements: 13.1, 13.2, 13.3, 13.5_

- [ ] 13.1 Write property test for configuration round-trip
  - **Property 10: Configuration Persistence Round-Trip**
  - **Validates: Requirements 4.5, 13.3, 13.5**

- [ ] 14. Integrate stock status display
  - Add stock badge to ComponentCard
  - Show "Sin Stock" indicator for out-of-stock items
  - Display stock warnings in SummaryPanel for selected out-of-stock components
  - Implement alternative suggestions for out-of-stock components
  - Show list of unavailable components when attempting to finalize
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 14.1 Write property test for stock visibility
  - **Property 16: Stock Status Visibility**
  - **Validates: Requirements 14.1, 14.2**

- [ ] 14.2 Write property test for stock warnings
  - **Property 17: Out-of-Stock Warning Propagation**
  - **Validates: Requirements 14.3**

- [ ] 15. Add routing and navigation
  - Create /pc-builder route in App.jsx
  - Add navigation link in Header component
  - Implement deep linking for shared configurations
  - Handle URL parameters for configuration loading
  - Add breadcrumb navigation
  - _Requirements: 13.5_

- [ ] 16. Implement warning notification system
  - Create WarningNotification component
  - Display bottleneck warnings when detected
  - Show PSU insufficiency warnings
  - Display performance imbalance suggestions
  - Allow users to dismiss or acknowledge warnings
  - Persist yellow indicators after warning acknowledgment
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 17. Add SEO and metadata
  - Create usePCBuilderSEO hook
  - Add meta tags for PC Builder page
  - Implement structured data for product configurations
  - Add Open Graph tags for shared configurations
  - Optimize for search engines
  - _Requirements: N/A (Enhancement)_

- [ ] 18. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 19. Create 3D visualization component
  - Integrate Three.js or similar 3D library
  - Create basic PC case 3D model
  - Add component models (CPU, GPU, RAM, etc.)
  - Implement component placement in 3D space
  - Add rotation and zoom controls
  - Update visualization when components are selected
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 20. Performance optimization
  - Memoize compatibility calculations
  - Implement virtual scrolling for large product lists
  - Optimize re-renders with React.memo
  - Lazy load component images
  - Add loading states for heavy computations
  - _Requirements: N/A (Enhancement)_

- [ ] 21. Accessibility improvements
  - Add ARIA labels to all interactive elements
  - Implement keyboard navigation for component selection
  - Ensure screen reader compatibility
  - Add focus indicators
  - Test with accessibility tools
  - _Requirements: N/A (Enhancement)_

- [ ] 22. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
