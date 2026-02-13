# Design Document: CategoryFilter Transitions Enhancement

## Overview

This design enhances the CategoryFilter component to provide smooth, fluid transitions when users select categories, particularly on mobile devices. The enhancement integrates the View Transitions API to create "magic move" effects between the category selection modal and filtered results, implements intelligent scroll management, optimizes body scroll locking to prevent jarring jumps, and improves overall visual continuity.

The design leverages the existing `useViewTransition` hook and builds upon the current architecture where mobile displays a fullscreen modal and desktop shows a horizontal carousel. The solution gracefully degrades for browsers without View Transitions API support.

**Key Design Goals:**
- Smooth visual transitions using View Transitions API with shared element animations
- Automatic scroll to results after category selection with proper timing coordination
- Optimized body scroll lock that prevents layout shifts and scroll jumps
- Enhanced modal animations with coordinated timing
- Visual continuity between category selection and filtered results
- Performance optimization using CSS transforms and minimal re-renders
- Cross-layout compatibility (mobile modal and desktop carousel)
- Graceful degradation for unsupported browsers

## Architecture

### Component Structure

The CategoryFilter component will be enhanced with the following architectural changes:

```
CategoryFilter (Enhanced)
├── useViewTransition hook (existing)
├── useScrollManagement hook (new)
├── useModalAnimation hook (new)
├── Mobile Layout
│   ├── Dropdown Trigger (with preview image)
│   └── Modal (via Portal)
│       ├── Backdrop (with transition)
│       ├── Modal Content (with slide/fade animation)
│       └── Category Grid (with shared element transitions)
└── Desktop Layout
    └── Horizontal Carousel (with smooth transitions)
```

### Transition Flow Architecture

The transition system follows this sequence:

1. **User selects category** → Trigger transition preparation
2. **Modal exit animation starts** → Fade out backdrop, slide down content
3. **View Transition captures snapshots** → Browser captures before/after states
4. **DOM updates** → Modal closes, category filter updates, results update
5. **View Transition animates** → Shared elements morph, other elements cross-fade
6. **Scroll to results** → Smooth scroll after transition completes
7. **Body scroll restored** → Unlock body scroll without jump

### State Management Integration

The enhanced component integrates with existing state management:

- **FilterContext**: Existing context for category state (unchanged)
- **Local Component State**: Modal open/close, animation states, scroll positions
- **Transition State**: Managed by View Transitions API and custom hooks
- **Scroll State**: Managed by new useScrollManagement hook

## Components and Interfaces

### 1. Enhanced CategoryFilter Component

**Props Interface:**
```typescript
interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string) => void;
}
```

**Internal State:**
```typescript
interface CategoryFilterState {
  isOpen: boolean;
  isAnimating: boolean;
  savedScrollPosition: number;
  showLeftArrow: boolean;
  showRightArrow: boolean;
}
```

### 2. useScrollManagement Hook

**Purpose:** Manages scroll position saving, restoration, and automatic scrolling to results.

**Interface:**
```typescript
interface UseScrollManagementReturn {
  saveScrollPosition: () => void;
  restoreScrollPosition: () => void;
  scrollToResults: (options?: ScrollOptions) => void;
  savedPosition: number;
}

interface ScrollOptions {
  delay?: number;
  behavior?: 'smooth' | 'instant';
  offset?: number;
}

function useScrollManagement(): UseScrollManagementReturn;
```

**Implementation Strategy:**
- Save scroll position when modal opens
- Restore position when modal closes without selection
- Calculate results section offset dynamically
- Coordinate scroll timing with View Transition completion
- Use `requestAnimationFrame` for smooth scroll coordination

### 3. useModalAnimation Hook

**Purpose:** Manages modal entrance and exit animations with proper timing coordination.

**Interface:**
```typescript
interface UseModalAnimationReturn {
  isAnimating: boolean;
  animateOpen: () => Promise<void>;
  animateClose: () => Promise<void>;
  modalClasses: string;
}

interface ModalAnimationOptions {
  duration?: number;
  easing?: string;
}

function useModalAnimation(
  isOpen: boolean,
  options?: ModalAnimationOptions
): UseModalAnimationReturn;
```

**Implementation Strategy:**
- Use CSS classes for animation states: `modal-entering`, `modal-entered`, `modal-exiting`, `modal-exited`
- Return promises that resolve when animations complete
- Coordinate with View Transition timing
- Prevent user interaction during animations

### 4. Enhanced useViewTransition Hook

The existing hook will be used as-is, but we'll extend its usage pattern:

**Current Interface:**
```typescript
interface UseViewTransitionReturn {
  startTransition: (
    callback: () => void,
    options?: { scrollToTop?: boolean }
  ) => void;
}
```

**Usage Pattern for Category Selection:**
```typescript
const { startTransition } = useViewTransition();

const handleCategorySelect = (category: string) => {
  startTransition(() => {
    setIsOpen(false);
    onCategoryChange(category);
  }, { scrollToTop: false }); // We'll handle scroll manually
};
```

## Data Models

### Transition Configuration

```typescript
interface TransitionConfig {
  // View Transition settings
  viewTransitionName: string;
  transitionDuration: number; // milliseconds
  
  // Scroll settings
  scrollDelay: number; // delay after transition before scrolling
  scrollBehavior: 'smooth' | 'instant';
  scrollOffset: number; // offset from top of results section
  
  // Animation settings
  modalAnimationDuration: number;
  modalEasing: string;
  
  // Performance settings
  useGPUAcceleration: boolean;
  minimizeRepaints: boolean;
}

const DEFAULT_TRANSITION_CONFIG: TransitionConfig = {
  viewTransitionName: 'category-card',
  transitionDuration: 350,
  scrollDelay: 100,
  scrollBehavior: 'smooth',
  scrollOffset: -80, // Account for fixed header
  modalAnimationDuration: 300,
  modalEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  useGPUAcceleration: true,
  minimizeRepaints: true,
};
```

### Scroll Position State

```typescript
interface ScrollPositionState {
  savedY: number;
  savedAt: number; // timestamp
  shouldRestore: boolean;
}
```

### Animation State

```typescript
type AnimationPhase = 
  | 'idle'
  | 'modal-opening'
  | 'modal-open'
  | 'modal-closing'
  | 'transitioning'
  | 'scrolling';

interface AnimationState {
  phase: AnimationPhase;
  startedAt: number;
  completedAt: number | null;
}
```

## CSS Architecture

### View Transition Names

Apply unique `view-transition-name` to shared elements:

```css
/* Selected category card in modal */
.category-card[data-selected="true"] {
  view-transition-name: category-selected;
}

/* Results section header or first product */
.catalog-results-header {
  view-transition-name: category-selected;
}

/* Fallback for browsers without support */
@supports not (view-transition-name: none) {
  .category-card[data-selected="true"],
  .catalog-results-header {
    view-transition-name: none;
  }
}
```

### Modal Animation Classes

```css
/* Modal backdrop animations */
.modal-fullscreen-backdrop {
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-entering .modal-fullscreen-backdrop,
.modal-exiting .modal-fullscreen-backdrop {
  opacity: 0;
}

.modal-entered .modal-fullscreen-backdrop {
  opacity: 1;
}

/* Modal content animations */
.modal-fullscreen-content {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.modal-entering .modal-fullscreen-content {
  transform: translateY(20px);
  opacity: 0;
}

.modal-entered .modal-fullscreen-content {
  transform: translateY(0);
  opacity: 1;
}

.modal-exiting .modal-fullscreen-content {
  transform: translateY(20px);
  opacity: 0;
}
```

### View Transition Customization

```css
/* Customize the transition animation */
::view-transition-old(category-selected),
::view-transition-new(category-selected) {
  animation-duration: 350ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth morphing between states */
::view-transition-old(category-selected) {
  animation-name: fade-out-scale;
}

::view-transition-new(category-selected) {
  animation-name: fade-in-scale;
}

@keyframes fade-out-scale {
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

@keyframes fade-in-scale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
}
```

## Implementation Details

### 1. View Transitions Integration

**Step 1: Add view-transition-name to category cards**

In the modal category grid, add data attribute and CSS class to selected card:

```jsx
<button
  key={category}
  onClick={() => handleCategorySelect(category)}
  data-selected={isSelected}
  data-transition-name={isSelected ? 'category-selected' : undefined}
  className={`category-card ${isSelected ? 'category-card-selected' : ''}`}
>
  {/* Card content */}
</button>
```

**Step 2: Add view-transition-name to results section**

The results section (likely in parent component) needs matching transition name:

```jsx
<div 
  className="catalog-results-header"
  data-transition-name="category-selected"
>
  {/* Results header */}
</div>
```

**Step 3: Wrap category change in View Transition**

```jsx
const handleCategorySelect = async (category) => {
  // Start modal exit animation
  await animateClose();
  
  // Start View Transition
  startTransition(() => {
    setIsOpen(false);
    onCategoryChange(category);
  });
  
  // Scroll to results after transition
  setTimeout(() => {
    scrollToResults({ delay: 100, behavior: 'smooth' });
  }, 350); // Match transition duration
};
```

### 2. Scroll Management Implementation

**useScrollManagement Hook:**

```jsx
function useScrollManagement() {
  const savedPositionRef = useRef(0);
  
  const saveScrollPosition = useCallback(() => {
    savedPositionRef.current = window.scrollY;
  }, []);
  
  const restoreScrollPosition = useCallback(() => {
    const savedY = savedPositionRef.current;
    // Use requestAnimationFrame for smooth restoration
    requestAnimationFrame(() => {
      window.scrollTo(0, savedY);
    });
  }, []);
  
  const scrollToResults = useCallback(({ 
    delay = 0, 
    behavior = 'smooth',
    offset = -80 
  } = {}) => {
    setTimeout(() => {
      const resultsSection = document.querySelector('[data-results-section]');
      if (resultsSection) {
        const top = resultsSection.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior });
      }
    }, delay);
  }, []);
  
  return {
    saveScrollPosition,
    restoreScrollPosition,
    scrollToResults,
    savedPosition: savedPositionRef.current,
  };
}
```

### 3. Body Scroll Lock Optimization

**Enhanced scroll lock with position preservation:**

```jsx
useEffect(() => {
  if (isOpen) {
    // Save current scroll position
    const scrollY = window.scrollY;
    saveScrollPosition();
    
    // Lock body scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore body scroll
      const bodyTop = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Restore scroll position without jump
      const scrollY = parseInt(bodyTop || '0', 10) * -1;
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    };
  }
}, [isOpen, saveScrollPosition]);
```

### 4. Modal Animation Implementation

**useModalAnimation Hook:**

```jsx
function useModalAnimation(isOpen, options = {}) {
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const duration = options.duration || 300;
  
  const animateOpen = useCallback(() => {
    return new Promise((resolve) => {
      setIsAnimating(true);
      setAnimationPhase('entering');
      
      requestAnimationFrame(() => {
        setAnimationPhase('entered');
        setTimeout(() => {
          setIsAnimating(false);
          resolve();
        }, duration);
      });
    });
  }, [duration]);
  
  const animateClose = useCallback(() => {
    return new Promise((resolve) => {
      setIsAnimating(true);
      setAnimationPhase('exiting');
      
      setTimeout(() => {
        setAnimationPhase('exited');
        setIsAnimating(false);
        resolve();
      }, duration);
    });
  }, [duration]);
  
  const modalClasses = `modal-${animationPhase}`;
  
  return {
    isAnimating,
    animateOpen,
    animateClose,
    modalClasses,
  };
}
```

### 5. Coordinated Transition Sequence

**Complete flow with timing coordination:**

```jsx
const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { startTransition } = useViewTransition();
  const { scrollToResults, saveScrollPosition, restoreScrollPosition } = useScrollManagement();
  const { isAnimating, animateOpen, animateClose, modalClasses } = useModalAnimation(isOpen);
  
  const handleCategorySelect = async (category) => {
    // Prevent interaction during animation
    if (isAnimating) return;
    
    // Step 1: Animate modal close (300ms)
    await animateClose();
    
    // Step 2: Start View Transition with DOM update
    startTransition(() => {
      setIsOpen(false);
      onCategoryChange(category);
    });
    
    // Step 3: Scroll to results after transition completes (350ms + 100ms delay)
    setTimeout(() => {
      scrollToResults({ 
        delay: 0, 
        behavior: 'smooth',
        offset: -80 
      });
    }, 450);
  };
  
  const handleModalClose = async () => {
    await animateClose();
    setIsOpen(false);
    // Restore scroll position when closing without selection
    restoreScrollPosition();
  };
  
  const handleModalOpen = async () => {
    saveScrollPosition();
    setIsOpen(true);
    await animateOpen();
  };
  
  // ... rest of component
};
```

### 6. Performance Optimizations

**Use CSS transforms for animations:**
- All animations use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `top`, `left`, `width`, `height` (causes reflow)
- Use `will-change` sparingly and only during animations

**Minimize re-renders:**
```jsx
// Memoize expensive computations
const categoryImage = useMemo(
  () => getCategoryImage(category),
  [category]
);

// Memoize callbacks
const handleScroll = useCallback((direction) => {
  // ... scroll logic
}, []);

// Use refs for values that don't need to trigger re-renders
const scrollPositionRef = useRef(0);
```

**Cleanup event listeners:**
```jsx
useEffect(() => {
  const handleClickOutside = (event) => {
    // ... logic
  };
  
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### 7. Fallback for Unsupported Browsers

**Feature detection and graceful degradation:**

```jsx
const supportsViewTransitions = 'startViewTransition' in document;

const handleCategorySelect = async (category) => {
  await animateClose();
  
  if (supportsViewTransitions) {
    // Use View Transitions API
    startTransition(() => {
      setIsOpen(false);
      onCategoryChange(category);
    });
  } else {
    // Fallback: direct update
    setIsOpen(false);
    onCategoryChange(category);
  }
  
  // Scroll works in both cases
  setTimeout(() => {
    scrollToResults({ behavior: 'smooth' });
  }, supportsViewTransitions ? 450 : 100);
};
```

### 8. Desktop Carousel Transitions

For desktop carousel, apply simpler transitions:

```jsx
const handleDesktopCategorySelect = (category) => {
  if (supportsViewTransitions) {
    startTransition(() => {
      onCategoryChange(category);
    });
    
    setTimeout(() => {
      scrollToResults({ behavior: 'smooth' });
    }, 350);
  } else {
    onCategoryChange(category);
    setTimeout(() => {
      scrollToResults({ behavior: 'smooth' });
    }, 100);
  }
};
```

## Error Handling

### Transition Failures

**Handle View Transition API errors:**

```jsx
const handleCategorySelect = async (category) => {
  try {
    await animateClose();
    
    if (supportsViewTransitions) {
      startTransition(() => {
        setIsOpen(false);
        onCategoryChange(category);
      });
    } else {
      setIsOpen(false);
      onCategoryChange(category);
    }
    
    setTimeout(() => {
      scrollToResults({ behavior: 'smooth' });
    }, supportsViewTransitions ? 450 : 100);
  } catch (error) {
    console.error('Transition error:', error);
    // Fallback: direct update without transition
    setIsOpen(false);
    onCategoryChange(category);
  }
};
```

### Scroll Failures

**Handle missing results section:**

```jsx
const scrollToResults = useCallback(({ delay = 0, behavior = 'smooth', offset = -80 } = {}) => {
  setTimeout(() => {
    const resultsSection = document.querySelector('[data-results-section]');
    if (!resultsSection) {
      console.warn('Results section not found, skipping scroll');
      return;
    }
    
    try {
      const top = resultsSection.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior });
    } catch (error) {
      console.error('Scroll error:', error);
      // Fallback: instant scroll
      window.scrollTo(0, resultsSection.offsetTop + offset);
    }
  }, delay);
}, []);
```

### Animation Timeout

**Prevent stuck animation states:**

```jsx
const animateClose = useCallback(() => {
  return new Promise((resolve) => {
    setIsAnimating(true);
    setAnimationPhase('exiting');
    
    const timeout = setTimeout(() => {
      setAnimationPhase('exited');
      setIsAnimating(false);
      resolve();
    }, duration);
    
    // Cleanup timeout if component unmounts
    return () => clearTimeout(timeout);
  });
}, [duration]);
```

## Testing Strategy

The testing strategy employs both unit tests and property-based tests to ensure comprehensive coverage of the transition system.

### Unit Testing Approach

Unit tests will focus on:
- Specific animation sequences and timing
- Modal open/close behavior
- Scroll position save/restore
- Event handler behavior
- Edge cases (missing elements, unsupported browsers)
- Integration with existing FilterContext

### Property-Based Testing Approach

Property-based tests will verify universal properties across randomized inputs:
- Transition timing coordination across various durations
- Scroll position preservation across different scroll values
- Animation state consistency across rapid user interactions
- Performance characteristics across different device capabilities

### Testing Configuration

- Minimum 100 iterations per property test
- Each property test references its design document property
- Tag format: **Feature: category-filter-transitions, Property {number}: {property_text}**
- Use React Testing Library for component testing
- Use Jest for test runner
- Mock View Transitions API for consistent testing

### Test Environment Setup

```javascript
// Mock View Transitions API
global.document.startViewTransition = jest.fn((callback) => {
  callback();
  return {
    updateCallbackDone: Promise.resolve(),
    ready: Promise.resolve(),
    finished: Promise.resolve(),
  };
});

// Mock scroll methods
global.scrollTo = jest.fn();
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16));
```
