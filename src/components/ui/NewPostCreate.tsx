"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { RotateCcw, Download, AlignLeft } from "lucide-react"

export default function NewPostCreate() {
    const [content, setContent] = useState('')
    const [temperature, setTemperature] = useState(0.56)
    const [maxLength, setMaxLength] = useState(256)
    const [topP, setTopP] = useState(0.9)
    const [model, setModel] = useState('davinci')

    const handleSubmit = () => {
        console.log('Submitting content:', content)
        console.log('Model:', model)
        console.log('Temperature:', temperature)
        console.log('Maximum Length:', maxLength)
        console.log('Top P:', topP)
        // Implement API call or other submit actions here
    }

    const handleReset = () => {
        setContent('')
        setTemperature(0.56)
        setMaxLength(256)
        setTopP(0.9)
        setModel('davinci')
    }

    const handleAlign = () => {
        console.log('Align clicked')
        // Implement alignment functionality here
    }

    const handleDownload = () => {
        console.log('Download clicked')
        // Implement download functionality here
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 border-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">글 작성</h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Save</Button>
                    <Button variant="outline">Share</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr,300px]">
                <Card>
                    <CardContent className="p-4">
                        <Textarea
                            placeholder="Write a tagline for an ice cream shop"
                            className="min-h-[500px] resize-none border-0 focus-visible:ring-0"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="flex items-center gap-2 mt-4">
                            <Button variant="default" onClick={handleSubmit}>Submit</Button>
                            <Button variant="outline" size="icon" onClick={handleReset}>
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col space-y-6">
                    <div className=" md:order-first">
                        <h3 className="font-medium mb-2">Mode</h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={handleAlign}>
                                <AlignLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleDownload}>
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <h3 className="font-medium mb-2">Mode</h3>
                        <Select value={model} onValueChange={(value) => setModel(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="davinci">text-davinci-003</SelectItem>
                                <SelectItem value="curie">text-curie-001</SelectItem>
                                <SelectItem value="babbage">text-babbage-001</SelectItem>
                                <SelectItem value="ada">text-ada-001</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="order-2 md:order-3">
                        <div className="flex justify-between mb-2">
                            <h3 className="font-medium">Temperature</h3>
                            <span className="text-sm text-muted-foreground">{temperature}</span>
                        </div>
                        <Slider
                            value={[temperature]}
                            onValueChange={([value]) => setTemperature(value)}
                            max={1}
                            step={0.01}
                            className="mb-6"
                        />
                    </div>

                    <div className="order-3 md:order-4">
                        <div className="flex justify-between mb-2">
                            <h3 className="font-medium">Maximum Length</h3>
                            <span className="text-sm text-muted-foreground">{maxLength}</span>
                        </div>
                        <Slider
                            value={[maxLength]}
                            onValueChange={([value]) => setMaxLength(value)}
                            max={1000}
                            step={1}
                            className="mb-6"
                        />
                    </div>

                    <div className="order-4 md:order-5">
                        <div className="flex justify-between mb-2">
                            <h3 className="font-medium">Top P</h3>
                            <span className="text-sm text-muted-foreground">{topP}</span>
                        </div>
                        <Slider
                            value={[topP]}
                            onValueChange={([value]) => setTopP(value)}
                            max={1}
                            step={0.01}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
