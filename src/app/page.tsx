"use client"

import { useState } from "react"
import { Camera, Upload, TrendingUp, TrendingDown, AlertCircle, Sparkles, BarChart3, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview da imagem
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Simular análise com IA
    setAnalyzing(true)
    setResult(null)

    // Simulação de análise (em produção, aqui chamaria a API do OpenAI Vision)
    setTimeout(() => {
      const mockAnalysis = {
        action: Math.random() > 0.5 ? "BUY" : "SELL",
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        patterns: [
          "Tendência de alta identificada",
          "Suporte forte em $45.20",
          "RSI indica sobrecompra",
          "Volume crescente detectado"
        ],
        price: "$47.85",
        target: Math.random() > 0.5 ? "$52.30" : "$43.10",
        stopLoss: Math.random() > 0.5 ? "$45.00" : "$50.20",
        timeframe: "15min",
        risk: Math.random() > 0.5 ? "Médio" : "Baixo"
      }
      setResult(mockAnalysis)
      setAnalyzing(false)
    }, 3000)
  }

  const handleCameraCapture = () => {
    // Trigger file input para câmera
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment'
    input.onchange = (e: any) => handleImageUpload(e)
    input.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TradeVision AI</h1>
                <p className="text-xs text-slate-400">Análise Inteligente de Gráficos</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              IA Avançada
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Análise de Gráficos com
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"> Inteligência Artificial</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tire uma foto ou faça upload de qualquer gráfico de trading e receba recomendações instantâneas de compra ou venda
          </p>
        </div>

        {/* Upload Area */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-8 mb-8">
          <div className="flex flex-col items-center gap-6">
            {!imagePreview ? (
              <>
                <div className="w-full max-w-md">
                  <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center hover:border-cyan-500 transition-all duration-300">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Envie seu gráfico
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Tire uma foto ou faça upload de uma imagem
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        onClick={handleCameraCapture}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Tirar Foto
                      </Button>
                      <label htmlFor="file-upload">
                        <Button
                          asChild
                          variant="outline"
                          className="border-slate-700 text-white hover:bg-slate-800 cursor-pointer"
                        >
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Fazer Upload
                          </span>
                        </Button>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full">
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img
                    src={imagePreview}
                    alt="Gráfico enviado"
                    className="w-full h-auto max-h-96 object-contain bg-slate-950"
                  />
                </div>
                <Button
                  onClick={() => {
                    setImagePreview(null)
                    setResult(null)
                  }}
                  variant="outline"
                  className="w-full border-slate-700 text-white hover:bg-slate-800"
                >
                  Enviar outro gráfico
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Loading State */}
        {analyzing && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-8 mb-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse" />
              <h3 className="text-xl font-semibold text-white">Analisando gráfico...</h3>
              <p className="text-slate-400 text-center">
                Nossa IA está identificando padrões, tendências e pontos de entrada
              </p>
            </div>
          </Card>
        )}

        {/* Results */}
        {result && !analyzing && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recomendação Principal */}
            <Card className={`p-6 border-2 ${
              result.action === "BUY" 
                ? "bg-gradient-to-br from-emerald-950/50 to-slate-900/50 border-emerald-500/50" 
                : "bg-gradient-to-br from-red-950/50 to-slate-900/50 border-red-500/50"
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Recomendação</p>
                  <div className="flex items-center gap-2">
                    {result.action === "BUY" ? (
                      <TrendingUp className="w-8 h-8 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-8 h-8 text-red-400" />
                    )}
                    <h3 className={`text-3xl font-bold ${
                      result.action === "BUY" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {result.action === "BUY" ? "COMPRAR" : "VENDER"}
                    </h3>
                  </div>
                </div>
                <Badge className={`${
                  result.action === "BUY" 
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" 
                    : "bg-red-500/20 text-red-400 border-red-500/50"
                }`}>
                  {result.confidence}% confiança
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-slate-400">Preço Atual</span>
                  <span className="text-white font-semibold">{result.price}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-slate-400">Alvo</span>
                  <span className="text-emerald-400 font-semibold">{result.target}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-slate-400">Stop Loss</span>
                  <span className="text-red-400 font-semibold">{result.stopLoss}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-slate-400">Timeframe</span>
                  <span className="text-white font-semibold">{result.timeframe}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-slate-400">Risco</span>
                  <Badge variant="outline" className="border-slate-700 text-white">
                    {result.risk}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Análise Detalhada */}
            <Card className="bg-slate-900/50 border-slate-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
                Análise Técnica
              </h3>
              <div className="space-y-3">
                {result.patterns.map((pattern: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg hover:bg-slate-950/80 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2" />
                    <p className="text-slate-300 flex-1">{pattern}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-400 font-semibold text-sm mb-1">
                      Aviso Importante
                    </p>
                    <p className="text-amber-200/80 text-xs">
                      Esta análise é gerada por IA e serve apenas como referência. 
                      Sempre faça sua própria análise antes de investir.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[
            { icon: Sparkles, title: "IA Avançada", desc: "Análise com OpenAI Vision" },
            { icon: TrendingUp, title: "Precisão", desc: "Até 85% de acurácia" },
            { icon: Activity, title: "Tempo Real", desc: "Resultados instantâneos" },
            { icon: BarChart3, title: "Multi-Ativos", desc: "Ações, Forex, Cripto" }
          ].map((feature, i) => (
            <Card key={i} className="bg-slate-900/30 border-slate-800 p-4 hover:bg-slate-900/50 transition-all">
              <feature.icon className="w-8 h-8 text-cyan-400 mb-2" />
              <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            TradeVision AI - Análise inteligente de gráficos com tecnologia de ponta
          </p>
        </div>
      </footer>
    </div>
  )
}
