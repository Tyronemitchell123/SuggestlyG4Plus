/**
 * @fileoverview One-Push Deployment System Component
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description React component for the One-Push Deployment System with payment integration
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import React, { useState, useRef, useEffect } from "react";
import { useAppService } from "../hooks/useAppService.js";
import OnePushDeploymentService from "../services/onePushDeploymentService.js";

const OnePushDeployment = () => {
  const { user, auth } = useAppService();
  const [files, setFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [deploymentResult, setDeploymentResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [deploymentHistory, setDeploymentHistory] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const fileInputRef = useRef();
  const deploymentService = new OnePushDeploymentService();

  useEffect(() => {
    if (user) {
      loadDeploymentHistory();
      loadAnalytics();
    }
  }, [user]);

  const loadDeploymentHistory = async () => {
    try {
      const history = await deploymentService.getDeploymentHistory(user.uid);
      setDeploymentHistory(history);
    } catch (error) {
      console.error("Failed to load deployment history:", error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const userAnalytics = await deploymentService.getDeploymentAnalytics(
        user.uid
      );
      setAnalytics(userAnalytics);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
    setAnalysis(null);
    setDeploymentResult(null);
    setError(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
    setAnalysis(null);
    setDeploymentResult(null);
    setError(null);
  };

  const analyzeProject = async () => {
    if (files.length === 0) {
      setError("Please select files to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const fileData = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }));

      const analysisResult =
        await deploymentService.deploymentService.analyzeProject(fileData);
      setAnalysis(analysisResult);
    } catch (error) {
      setError("Failed to analyze project: " + error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const deployProject = async () => {
    if (!user) {
      setError("Please log in to deploy");
      return;
    }

    if (files.length === 0) {
      setError("Please select files to deploy");
      return;
    }

    setIsDeploying(true);
    setError(null);

    try {
      const fileData = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }));

      const result = await deploymentService.deployOnePush(user.uid, fileData);

      if (result.success) {
        setDeploymentResult(result);
        loadDeploymentHistory();
        loadAnalytics();
      } else {
        if (result.needsUpgrade) {
          setSelectedPlan(result.recommendations[0]);
          setShowPaymentModal(true);
        } else {
          setError(result.message);
        }
      }
    } catch (error) {
      setError("Deployment failed: " + error.message);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleOneTimePayment = async (packageId) => {
    if (!user) {
      setError("Please log in to purchase");
      return;
    }

    setIsDeploying(true);
    setError(null);

    try {
      const fileData = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }));

      const result = await deploymentService.deployOneTimeWithPayment(
        user.uid,
        packageId,
        fileData,
        {},
        null // paymentMethodId would be passed here
      );

      if (result.success) {
        setDeploymentResult(result);
        setShowPaymentModal(false);
        loadDeploymentHistory();
        loadAnalytics();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Payment failed: " + error.message);
    } finally {
      setIsDeploying(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      vercel: "🚀",
      netlify: "🌐",
      railway: "🚂",
      firebase: "🔥",
      heroku: "💎",
      aws: "☁️",
    };
    return icons[platform] || "📦";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 One-Push Deployment
          </h1>
          <p className="text-xl text-gray-600">
            Upload your project files and we'll automatically analyze and deploy
            to the best platform
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - File Upload & Analysis */}
          <div className="space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                📁 Upload Project Files
              </h2>

              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-6xl mb-4">📦</div>
                <p className="text-lg text-gray-600 mb-2">
                  Drag and drop your project files here
                </p>
                <p className="text-sm text-gray-500">or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {files.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">
                    Selected Files ({files.length})
                  </h3>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded"
                      >
                        <span className="truncate">{file.name}</span>
                        <span className="text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Total size:{" "}
                    {formatFileSize(
                      files.reduce((sum, file) => sum + file.size, 0)
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={analyzeProject}
                  disabled={files.length === 0 || isAnalyzing}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? "🔍 Analyzing..." : "🔍 Analyze Project"}
                </button>
                <button
                  onClick={deployProject}
                  disabled={files.length === 0 || isDeploying}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeploying ? "🚀 Deploying..." : "🚀 Deploy Now"}
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            {analysis && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  📊 Project Analysis
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">
                      Project Type
                    </div>
                    <div className="text-lg font-semibold">
                      {analysis.projectType}
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">
                      File Size
                    </div>
                    <div className="text-lg font-semibold">
                      {formatFileSize(analysis.fileSize)}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Best Platform</h3>
                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                    <span className="text-2xl">
                      {getPlatformIcon(analysis.bestPlatform.key)}
                    </span>
                    <div>
                      <div className="font-semibold">
                        {analysis.bestPlatform.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Score: {analysis.bestPlatform.score}/100
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">
                    Special Features Detected
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(analysis.specialFeatures).map(
                      ([feature, enabled]) =>
                        enabled && (
                          <span
                            key={feature}
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                          >
                            {feature.toUpperCase()}
                          </span>
                        )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">All Recommendations</h3>
                  <div className="space-y-2">
                    {analysis.recommendations.map((platform, index) => (
                      <div
                        key={platform.key}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">
                            {getPlatformIcon(platform.key)}
                          </span>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          Score: {platform.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-red-800 font-medium">{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results & History */}
          <div className="space-y-6">
            {/* Deployment Result */}
            {deploymentResult && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  ✅ Deployment Successful!
                </h2>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">🚀</span>
                    <span className="font-semibold text-green-800">
                      Your project is live!
                    </span>
                  </div>
                  <a
                    href={deploymentResult.deployment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium break-all"
                  >
                    {deploymentResult.deployment.url}
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">
                      Platform
                    </div>
                    <div className="font-semibold">
                      {deploymentResult.deployment.platform}
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">
                      Deployment ID
                    </div>
                    <div className="font-semibold text-sm">
                      {deploymentResult.deployment.deploymentId}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    window.open(deploymentResult.deployment.url, "_blank")
                  }
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
                >
                  🌐 Visit Your Site
                </button>
              </div>
            )}

            {/* Analytics */}
            {analytics && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  📈 Deployment Analytics
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {analytics.totalDeployments}
                    </div>
                    <div className="text-sm text-blue-600">
                      Total Deployments
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {analytics.successfulDeployments}
                    </div>
                    <div className="text-sm text-green-600">Successful</div>
                  </div>
                </div>

                {analytics.mostUsedPlatform && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 font-medium">
                      Most Used Platform
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">
                        {getPlatformIcon(analytics.mostUsedPlatform)}
                      </span>
                      <span className="font-semibold">
                        {analytics.mostUsedPlatform}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Recent Deployments */}
            {deploymentHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  📋 Recent Deployments
                </h2>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {deploymentHistory.slice(0, 5).map((deployment) => (
                    <div
                      key={deployment.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {getPlatformIcon(deployment.deployment?.platform)}
                        </span>
                        <div>
                          <div className="font-medium">
                            {deployment.deployment?.platform || "Unknown"}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(
                              deployment.createdAt
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          deployment.status === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {deployment.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-semibold mb-4">
                💳 Upgrade Required
              </h2>
              <p className="text-gray-600 mb-4">{selectedPlan.reason}</p>

              <div className="space-y-3">
                <button
                  onClick={() => handleOneTimePayment("premium")}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
                >
                  💳 Purchase Premium One-Push ($14.99)
                </button>
                <button
                  onClick={() => handleOneTimePayment("basic")}
                  className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700"
                >
                  💳 Purchase Basic One-Push ($4.99)
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnePushDeployment;
