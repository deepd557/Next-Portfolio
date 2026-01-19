'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Stepper component from ReactBits - https://www.reactbits.dev/
function StepperComponent({
  steps = [],
  activeStep: controlledActiveStep,
  onChange,
  className = '',
  orientation = 'horizontal',
  showLabels = true,
  showConnector = true,
  animationType = 'slide',
  colorScheme = 'modern',
  size = 'md',
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get step from URL parameter or use controlled prop
  const urlStep = searchParams?.get('step') ? parseInt(searchParams.get('step'), 10) : null;
  const [internalStep, setInternalStep] = useState(
    urlStep !== null && !isNaN(urlStep) ? urlStep : (controlledActiveStep !== undefined ? controlledActiveStep : 0)
  );
  
  const activeStep = controlledActiveStep !== undefined ? controlledActiveStep : internalStep;

  // Sync URL parameter with step changes
  useEffect(() => {
    if (urlStep !== null && !isNaN(urlStep) && urlStep !== activeStep) {
      setInternalStep(urlStep);
    }
  }, [urlStep, activeStep]);

  // Update URL when step changes (only if not controlled)
  useEffect(() => {
    if (controlledActiveStep === undefined && pathname && router) {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('step', activeStep.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [activeStep, controlledActiveStep, pathname, router, searchParams]);

  const handleStepClick = (index) => {
    if (index < 0 || index >= steps.length) return;
    if (index <= activeStep || index === activeStep + 1) {
      const newStep = controlledActiveStep !== undefined ? controlledActiveStep : index;
      if (controlledActiveStep === undefined) {
        setInternalStep(index);
      }
      if (onChange) {
        onChange(index);
      }
    }
  };

  // Ensure activeStep is within bounds
  const safeActiveStep = steps.length > 0 ? Math.max(0, Math.min(activeStep, steps.length - 1)) : 0;

  // Early return if no steps
  if (!steps || steps.length === 0) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No steps available</p>
      </div>
    );
  }

  // Modern color schemes
  const colorSchemes = {
    modern: {
      active: 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500',
      completed: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      inactive: 'bg-gray-300 dark:bg-gray-700',
      text: {
        active: 'text-violet-600 dark:text-violet-400',
        completed: 'text-emerald-600 dark:text-emerald-400',
        inactive: 'text-gray-500 dark:text-gray-400',
      },
      connector: {
        active: 'bg-gradient-to-r from-violet-500 to-purple-500',
        completed: 'bg-gradient-to-r from-emerald-400 to-teal-500',
        inactive: 'bg-gray-300 dark:bg-gray-700',
      },
    },
    blue: {
      active: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      completed: 'bg-gradient-to-r from-blue-400 to-cyan-400',
      inactive: 'bg-gray-300 dark:bg-gray-700',
      text: {
        active: 'text-blue-600 dark:text-blue-400',
        completed: 'text-blue-600 dark:text-blue-400',
        inactive: 'text-gray-500 dark:text-gray-400',
      },
      connector: {
        active: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        completed: 'bg-gradient-to-r from-blue-400 to-cyan-400',
        inactive: 'bg-gray-300 dark:bg-gray-700',
      },
    },
    green: {
      active: 'bg-gradient-to-r from-green-500 to-emerald-500',
      completed: 'bg-gradient-to-r from-green-400 to-emerald-400',
      inactive: 'bg-gray-300 dark:bg-gray-700',
      text: {
        active: 'text-green-600 dark:text-green-400',
        completed: 'text-green-600 dark:text-green-400',
        inactive: 'text-gray-500 dark:text-gray-400',
      },
      connector: {
        active: 'bg-gradient-to-r from-green-500 to-emerald-500',
        completed: 'bg-gradient-to-r from-green-400 to-emerald-400',
        inactive: 'bg-gray-300 dark:bg-gray-700',
      },
    },
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.modern;

  const sizes = {
    sm: {
      step: 'w-8 h-8 text-sm',
      connector: 'h-0.5',
      label: 'text-xs mt-1',
    },
    md: {
      step: 'w-12 h-12 text-base',
      connector: 'h-1',
      label: 'text-sm mt-2',
    },
    lg: {
      step: 'w-16 h-16 text-lg',
      connector: 'h-1.5',
      label: 'text-base mt-3',
    },
  };

  const sizeClasses = sizes[size] || sizes.md;

  const getStepState = (index) => {
    if (index < safeActiveStep) return 'completed';
    if (index === safeActiveStep) return 'active';
    return 'inactive';
  };

  const getStepColor = (state) => {
    switch (state) {
      case 'active':
        return colors.active;
      case 'completed':
        return colors.completed;
      default:
        return colors.inactive;
    }
  };

  const getTextColor = (state) => {
    switch (state) {
      case 'active':
        return colors.text.active;
      case 'completed':
        return colors.text.completed;
      default:
        return colors.text.inactive;
    }
  };

  const getConnectorColor = (index) => {
    if (index < activeStep) return colors.connector.completed;
    if (index === activeStep) return colors.connector.active;
    return colors.connector.inactive;
  };

  // Animation variants
  const stepVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1 },
  };

  const connectorVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
  };

  const contentVariants = {
    slide: {
      initial: { x: 20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -20, opacity: 0 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
    },
  };

  const animationVariant = contentVariants[animationType] || contentVariants.slide;

  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, index) => {
          const state = getStepState(index);
          const isClickable = index <= safeActiveStep || index === safeActiveStep + 1;

          return (
            <div key={index} className="flex items-start">
              <div className="flex flex-col items-center">
                <motion.button
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={isClickable ? 'hover' : ''}
                  whileTap={isClickable ? { scale: 0.95 } : ''}
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  className={`
                    ${sizeClasses.step}
                    ${getStepColor(state)}
                    rounded-full
                    flex items-center justify-center
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all duration-300
                    ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                    ${state === 'active' ? 'ring-4 ring-violet-200 dark:ring-violet-900 ring-opacity-50' : ''}
                  `}
                >
                  {state === 'completed' ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.button>

                {index < steps.length - 1 && showConnector && (
                  <motion.div
                    variants={connectorVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`
                      ${sizeClasses.connector}
                      w-0.5
                      my-2
                      ${getConnectorColor(index)}
                      rounded-full
                    `}
                  />
                )}
              </div>

              <div className="ml-4 flex-1 pb-8">
                {showLabels && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      font-semibold
                      ${getTextColor(state)}
                      ${sizeClasses.label}
                    `}
                  >
                    {step.label || `Step ${index + 1}`}
                  </motion.div>
                )}
                {step.description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                    className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                  >
                    {step.description}
                  </motion.p>
                )}

                {index === safeActiveStep && step.content && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={safeActiveStep}
                      variants={animationVariant}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      {step.content}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal orientation
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const state = getStepState(index);
          const isClickable = index <= safeActiveStep || index === safeActiveStep + 1;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.button
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={isClickable ? 'hover' : ''}
                  whileTap={isClickable ? { scale: 0.95 } : ''}
                  onClick={() => handleStepClick(index)}
                  disabled={!isClickable}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    ${sizeClasses.step}
                    ${getStepColor(state)}
                    rounded-full
                    flex items-center justify-center
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all duration-300
                    relative z-10
                    ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                    ${state === 'active' ? 'ring-4 ring-violet-200 dark:ring-violet-900 ring-opacity-50' : ''}
                  `}
                >
                  {state === 'completed' ? (
                    <motion.svg
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.button>

                {showLabels && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                    className={`
                      font-semibold
                      ${getTextColor(state)}
                      ${sizeClasses.label}
                      text-center
                      max-w-[100px]
                    `}
                  >
                    {step.label || `Step ${index + 1}`}
                  </motion.div>
                )}

                {step.description && showLabels && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center max-w-[100px]"
                  >
                    {step.description}
                  </motion.p>
                )}
              </div>

              {index < steps.length - 1 && showConnector && (
                <motion.div
                  variants={connectorVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className={`
                    ${sizeClasses.connector}
                    flex-1
                    mx-2
                    ${getConnectorColor(index)}
                    rounded-full
                    relative
                    -z-0
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Active step content */}
      {steps[safeActiveStep]?.content && (
        <AnimatePresence mode="wait">
          <motion.div
            key={safeActiveStep}
            variants={animationVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {steps[safeActiveStep].content}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// Export with Suspense wrapper for Next.js App Router
export default function Stepper(props) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
      </div>
    }>
      <StepperComponent {...props} />
    </Suspense>
  );
}

