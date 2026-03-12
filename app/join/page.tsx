"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Upload, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";

type FormData = {
  fullName: string;
  alias: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  role: string;
  languages: string;
  frameworks: string;
  experienceYears: string;
  organization: string;
  projectDescription: string;
  github: string;
  portfolio: string;
  otherPlatforms: string;
  motivation: string;
  contribution: string;
  interests: string;
};

const steps = [
  { id: 1, title: "Identity", desc: "Who are you?" },
  { id: 2, title: "Tech Background", desc: "Your skills" },
  { id: 3, title: "Experience", desc: "Your journey" },
  { id: 4, title: "Portfolio & CV", desc: "Show your work" },
  { id: 5, title: "Motivation", desc: "Why join us?" },
];

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (currentStep === 1) fieldsToValidate = ["fullName", "alias", "email", "phone", "location", "linkedin"];
    if (currentStep === 2) fieldsToValidate = ["role", "languages", "frameworks"];
    if (currentStep === 3) fieldsToValidate = ["experienceYears", "organization", "projectDescription"];
    if (currentStep === 4) fieldsToValidate = ["github", "portfolio"];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      let cvUrl = "";
      if (file) {
        const storageRef = ref(storage, `cvs/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        cvUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "applicants"), {
        ...data,
        cvUrl,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // Simulate Cloud Function for email confirmation
      console.log("Application submitted, triggering email confirmation...");

      setIsSuccess(true);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setErrorMsg(error.message || "Failed to submit application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terminal-green/20 rounded-full blur-[150px]"></div>
        </div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-cyber-black/80 border border-terminal-green/30 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,255,0,0.1)] backdrop-blur-md relative z-10 text-center max-w-2xl w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="inline-block p-4 bg-terminal-green/20 rounded-full mb-6"
          >
            <CheckCircle2 className="w-16 h-16 text-terminal-green" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans">
            Application_Received
          </h2>
          <p className="text-gray-400 font-mono mb-8 text-lg">
            Your data has been securely transmitted to the Error_CCx404 mainframe.
            Our moderators will review your profile and contact you soon.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-cyber-black border border-terminal-green text-terminal-green rounded font-mono hover:bg-terminal-green hover:text-cyber-black transition-colors"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Return_To_Base
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black text-white py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyber-blue/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <Link href="/" className="inline-flex items-center text-cyber-blue hover:text-white font-mono text-sm mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-4">
            Join <span className="text-cyber-blue">Error_CCx404</span>
          </h1>
          <p className="text-gray-400 font-mono">
            Initialize onboarding sequence. Complete all steps to submit your application.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep >= step.id ? "text-cyber-blue" : "text-gray-600"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm mb-2 border-2 transition-colors duration-300 ${
                    currentStep >= step.id
                      ? "border-cyber-blue bg-cyber-blue/10 shadow-[0_0_10px_rgba(0,245,255,0.5)]"
                      : "border-gray-700 bg-cyber-black"
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-xs hidden md:block font-mono uppercase tracking-wider">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-blue to-neon-purple"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-cyber-black/80 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue via-neon-purple to-terminal-green"></div>
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start text-red-400 font-mono text-sm">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center">
                    <Terminal className="w-5 h-5 mr-3 text-cyber-blue" />
                    01. Identity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Full Name *</label>
                      <input
                        {...register("fullName", { required: "Full name is required" })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-400 text-xs font-mono">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Hacker Alias / Nickname *</label>
                      <input
                        {...register("alias", { required: "Alias is required" })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="ZeroCool"
                      />
                      {errors.alias && <p className="text-red-400 text-xs font-mono">{errors.alias.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Email Address *</label>
                      <input
                        type="email"
                        {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs font-mono">Valid email is required</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Phone / Discord / Telegram *</label>
                      <input
                        {...register("phone", { required: "Contact info is required" })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="@username or +123456789"
                      />
                      {errors.phone && <p className="text-red-400 text-xs font-mono">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">City & Country *</label>
                      <input
                        {...register("location", { required: "Location is required" })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="Tokyo, Japan"
                      />
                      {errors.location && <p className="text-red-400 text-xs font-mono">{errors.location.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">LinkedIn Profile</label>
                      <input
                        {...register("linkedin")}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center">
                    <Terminal className="w-5 h-5 mr-3 text-cyber-blue" />
                    02. Technical Background
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Primary Role *</label>
                      <select
                        {...register("role", { required: "Please select a role" })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all appearance-none"
                      >
                        <option value="">Select your primary domain...</option>
                        <option value="Developer">Software Developer</option>
                        <option value="DevOps">DevOps Engineer</option>
                        <option value="Cybersecurity">Cybersecurity Analyst</option>
                        <option value="AI/ML">AI / ML Engineer</option>
                        <option value="Robotics">Robotics Engineer</option>
                        <option value="UI/UX">UI/UX Designer</option>
                        <option value="IoT">IoT Specialist</option>
                        <option value="Student">Student / Learner</option>
                      </select>
                      {errors.role && <p className="text-red-400 text-xs font-mono">{errors.role.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Programming Languages *</label>
                      <input
                        {...register("languages", { required: "Languages are required" })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="e.g., Python, Rust, TypeScript, C++"
                      />
                      {errors.languages && <p className="text-red-400 text-xs font-mono">{errors.languages.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Frameworks & Tools *</label>
                      <input
                        {...register("frameworks", { required: "Frameworks are required" })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="e.g., React, Docker, Kubernetes, TensorFlow"
                      />
                      {errors.frameworks && <p className="text-red-400 text-xs font-mono">{errors.frameworks.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center">
                    <Terminal className="w-5 h-5 mr-3 text-cyber-blue" />
                    03. Experience
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-gray-400">Years of Experience *</label>
                        <select
                          {...register("experienceYears", { required: "Experience is required" })}
                          className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all appearance-none"
                        >
                          <option value="">Select...</option>
                          <option value="0-1">0-1 years (Beginner)</option>
                          <option value="1-3">1-3 years (Junior)</option>
                          <option value="3-5">3-5 years (Mid-level)</option>
                          <option value="5+">5+ years (Senior)</option>
                        </select>
                        {errors.experienceYears && <p className="text-red-400 text-xs font-mono">{errors.experienceYears.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-gray-400">Current Organization / University *</label>
                        <input
                          {...register("organization", { required: "Organization is required" })}
                          className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                          placeholder="Tech Corp / MIT"
                        />
                        {errors.organization && <p className="text-red-400 text-xs font-mono">{errors.organization.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Describe your best project or hackathon experience *</label>
                      <textarea
                        {...register("projectDescription", { required: "Description is required" })}
                        rows={4}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all resize-none"
                        placeholder="Tell us about a time you built something cool..."
                      />
                      {errors.projectDescription && <p className="text-red-400 text-xs font-mono">{errors.projectDescription.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center">
                    <Terminal className="w-5 h-5 mr-3 text-cyber-blue" />
                    04. Portfolio & CV
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-gray-400">GitHub Profile *</label>
                        <input
                          {...register("github", { required: "GitHub is required" })}
                          className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                          placeholder="https://github.com/username"
                        />
                        {errors.github && <p className="text-red-400 text-xs font-mono">{errors.github.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-mono text-gray-400">Portfolio Website</label>
                        <input
                          {...register("portfolio")}
                          className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                          placeholder="https://yourdomain.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Other Platforms (Kaggle, HackerRank, etc.)</label>
                      <input
                        {...register("otherPlatforms")}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="Links separated by commas"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Upload CV (PDF/DOCX)</label>
                      <div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-cyber-blue/50 transition-colors bg-cyber-black/30 group">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="p-3 bg-white/5 rounded-full group-hover:bg-cyber-blue/10 transition-colors">
                            <Upload className="w-6 h-6 text-gray-400 group-hover:text-cyber-blue" />
                          </div>
                          {file ? (
                            <p className="text-cyber-blue font-mono text-sm">{file.name}</p>
                          ) : (
                            <>
                              <p className="text-gray-300 font-medium">Drag & drop your CV here</p>
                              <p className="text-gray-500 text-xs font-mono">or click to browse files (Max 5MB)</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center">
                    <Terminal className="w-5 h-5 mr-3 text-cyber-blue" />
                    05. Community Motivation
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Why do you want to join Error_CCx404? *</label>
                      <textarea
                        {...register("motivation", { required: "This field is required" })}
                        rows={3}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all resize-none"
                        placeholder="I want to learn, build, and collaborate..."
                      />
                      {errors.motivation && <p className="text-red-400 text-xs font-mono">{errors.motivation.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">What can you contribute to the community? *</label>
                      <textarea
                        {...register("contribution", { required: "This field is required" })}
                        rows={3}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all resize-none"
                        placeholder="I can organize workshops, contribute to open source..."
                      />
                      {errors.contribution && <p className="text-red-400 text-xs font-mono">{errors.contribution.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-mono text-gray-400">Areas of Interest *</label>
                      <input
                        {...register("interests", { required: "This field is required" })}
                        className="w-full bg-cyber-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                        placeholder="e.g., DevOps, Cybersecurity, Robotics, AI, Open Source"
                      />
                      {errors.interests && <p className="text-red-400 text-xs font-mono">{errors.interests.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between pt-6 border-t border-white/10">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-white/5 text-white rounded-lg font-mono hover:bg-white/10 transition-colors flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-cyber-blue text-cyber-black font-bold rounded-lg font-mono hover:bg-white transition-colors flex items-center shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                >
                  Next Step <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-neon-purple text-white font-bold rounded-lg font-mono hover:bg-purple-500 transition-colors flex items-center shadow-[0_0_20px_rgba(108,99,255,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Transmitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Terminal className="w-4 h-4 mr-2" /> Submit_Application
                    </span>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
