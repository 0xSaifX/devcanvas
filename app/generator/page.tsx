"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, Download, Copy, Check, ArrowLeft, Code2 } from "lucide-react";
import Link from "next/link";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";

type Framework = "react" | "vue" | "html";

export default function GeneratorPage() {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>("react");
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setScreenshot(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }
      }
    }
  };

  const generateCode = async () => {
    if (!screenshot) return;

    setLoading(true);
    setErrorMessage(null);
    setGeneratedCode("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: screenshot,
          framework,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }
      if (!data.code || typeof data.code !== "string") {
        throw new Error("The API did not return generated code.");
      }
      setGeneratedCode(data.code);
    } catch (error) {
      console.error("Error generating code:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to generate code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const ext = framework === "react" ? "jsx" : framework === "vue" ? "vue" : "html";
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `component.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const highlightedCode = generatedCode
    ? Prism.highlight(generatedCode, Prism.languages.jsx, "jsx")
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Header */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold">DevCanvas</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Upload Screenshot</h1>
              <p className="text-gray-400">
                Upload or paste a UI screenshot to get started
              </p>
            </div>

            {/* Framework Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Output Framework</label>
              <div className="grid grid-cols-3 gap-2">
                {(["react", "vue", "html"] as Framework[]).map((fw) => (
                  <button
                    key={fw}
                    onClick={() => setFramework(fw)}
                    className={`py-2 px-4 rounded-lg font-semibold transition-all ${
                      framework === fw
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {fw.charAt(0).toUpperCase() + fw.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div
              onPaste={handlePaste}
              className="relative border-2 border-dashed border-purple-500/30 rounded-2xl p-12 text-center hover:border-purple-500/50 transition-colors bg-white/5 backdrop-blur-sm"
            >
              {screenshot ? (
                <div className="space-y-4">
                  <img
                    src={screenshot}
                    alt="Uploaded screenshot"
                    className="max-h-96 mx-auto rounded-lg shadow-2xl"
                  />
                  <button
                    onClick={() => setScreenshot(null)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Remove and upload new
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-semibold mb-2">
                    Drop screenshot here or click to upload
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Or paste from clipboard (Cmd/Ctrl + V)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>

            {/* Generate Button */}
            {screenshot && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={generateCode}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-500/30 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Code...
                  </>
                ) : (
                  <>
                    <Code2 className="w-5 h-5" />
                    Generate Code
                  </>
                )}
              </motion.button>
            )}

            {errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {errorMessage}
              </div>
            )}
          </motion.div>

          {/* Right Panel - Code Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">Generated Code</h2>
              <p className="text-gray-400">
                Production-ready {framework.toUpperCase()} component
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
              {/* Code Header */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-slate-900/50">
                <span className="text-sm text-gray-400">
                  component.{framework === "react" ? "jsx" : framework === "vue" ? "vue" : "html"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCode}
                    disabled={!generatedCode}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Copy code"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={downloadCode}
                    disabled={!generatedCode}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download code"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-auto max-h-[600px]">
                {generatedCode ? (
                  <pre className="text-sm">
                    <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <Code2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>Your generated code will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            {!generatedCode && (
              <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <h3 className="font-semibold mb-2 text-purple-300">💡 Pro Tips</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Use clear, high-resolution screenshots for best results</li>
                  <li>• The AI works best with clean, focused UI components</li>
                  <li>• Generated code includes proper semantic HTML and styling</li>
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
