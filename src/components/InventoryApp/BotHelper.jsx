import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';

const BotHelper = () => {
  return (
    <>
      {/* Bot Helper - Mobile - Posición fija */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="sm:hidden fixed top-20 left-2 z-40 flex items-center gap-2"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full p-2 shadow-lg border-2 border-cyan-300/50">
            <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
            className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
          />
        </motion.div>
        
        <motion.div
          animate={{ x: [0, 3, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowRight className="w-4 h-4 text-cyan-400" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Bot Helper - Desktop - Posición fija */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="hidden sm:flex fixed top-20 right-4 z-40 items-center gap-3"
      >
        <div className="relative">
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full p-2.5 shadow-xl border-2 border-cyan-300/50">
              <Bot className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
              className="absolute inset-0 bg-cyan-400 rounded-full blur-md"
            />
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowRight className="w-5 h-5 text-cyan-400" strokeWidth={3} />
          </motion.div>
          
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-400/30">
            <p className="text-xs font-bold text-cyan-300 whitespace-nowrap">
              ¡Info importante!
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BotHelper;
