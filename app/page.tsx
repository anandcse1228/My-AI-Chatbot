'use client';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSpeechButton,
} from '@/components/ai-elements/prompt-input';
import { Fragment, useState, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { CopyIcon, GlobeIcon, RefreshCcwIcon, ChevronDownIcon } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui';
import { Button } from '@/components/ui';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectValue,
} from '@/components/ui';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';

interface ConversationData {
  id: string;
  title: string;
  messages: ReturnType<typeof useChat>['messages'];
}

const GeminiChatbot = () => {
  const [input, setInput] = useState('');
  const [webSearch, setWebSearch] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Flash');
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [modelsError, setModelsError] = useState<string | null>(null);
  const [models, setModels] = useState<{ id: string; name: string; provider: string }[]>([]);
  const [openRouterAvailable, setOpenRouterAvailable] = useState(false);
  const { messages, sendMessage, status, regenerate } = useChat();

  
  const FALLBACK_MODELS: { id: string; name: string; provider: string }[] = [
    { id: 'Gemini 2.5 Flash', name: 'Gemini 2.5 Flash', provider: 'google' },
    { id: 'openrouter/allenai/olmo-3.1-32b-think:free', name: 'AllenAI OLMo 3.1 32B Think', provider: 'openrouter' },
    { id: 'openrouter/xiaomi/mimo-v2-flash:free', name: 'Xiaomi MiMo v2 Flash', provider: 'openrouter' },
    { id: 'openrouter/nvidia/nemotron-3-nano-30b-a3b:free', name: 'NVIDIA Nemotron 3 Nano 30B A3B', provider: 'openrouter' },
    { id: 'openrouter/mistralai/devstral-2512:free', name: 'MistralAI Devstral 2512', provider: 'openrouter' },
    { id: 'openrouter/nex-agi/deepseek-v3.1-nex-n1:free', name: 'NexAGI DeepSeek v3.1 Nex N1', provider: 'openrouter' },
    { id: 'openrouter/kwaipilot/kat-coder-pro:free', name: 'KwaiPilot Kat Coder Pro', provider: 'openrouter' },
    { id: 'openrouter/openai/gpt-oss-120b:free', name: 'OpenAI GPT OSS 120B', provider: 'openrouter' },
    { id: 'openrouter/z-ai/glm-4.5-air:free', name: 'Z-AI GLM 4.5 Air', provider: 'openrouter' },
    { id: 'openrouter/qwen/qwen3-coder:free', name: 'Qwen Qwen3 Coder', provider: 'openrouter' },
    { id: 'openrouter/cognitivecomputations/dolphin-mistral-24b-venice-edition:free', name: 'Dolphin Mistral 24B Venice', provider: 'openrouter' },
    { id: 'openrouter/qwen/qwen3-4b:free', name: 'Qwen Qwen3 4B', provider: 'openrouter' },
  ];

  const displayModels = models.length > 0 ? models : FALLBACK_MODELS;

  const loadModels = async () => {
    setModelsLoading(true);
    setModelsError(null);
    try {
      // Simulate loading models. In real app, fetch from API.
      const geminiModels = [
        { id: 'Gemini 2.5 Flash', name: 'Gemini 2.5 Flash', provider: 'google' },
      ];
      const openRouterModels = [
        { id: 'openrouter/allenai/olmo-3.1-32b-think:free', name: 'AllenAI OLMo 3.1 32B Think', provider: 'openrouter' },
        { id: 'openrouter/xiaomi/mimo-v2-flash:free', name: 'Xiaomi MiMo v2 Flash', provider: 'openrouter' },
        { id: 'openrouter/nvidia/nemotron-3-nano-30b-a3b:free', name: 'NVIDIA Nemotron 3 Nano 30B A3B', provider: 'openrouter' },
        { id: 'openrouter/mistralai/devstral-2512:free', name: 'MistralAI Devstral 2512', provider: 'openrouter' },
        { id: 'openrouter/nex-agi/deepseek-v3.1-nex-n1:free', name: 'NexAGI DeepSeek v3.1 Nex N1', provider: 'openrouter' },
        { id: 'openrouter/kwaipilot/kat-coder-pro:free', name: 'KwaiPilot Kat Coder Pro', provider: 'openrouter' },
        { id: 'openrouter/openai/gpt-oss-120b:free', name: 'OpenAI GPT OSS 120B', provider: 'openrouter' },
        { id: 'openrouter/z-ai/glm-4.5-air:free', name: 'Z-AI GLM 4.5 Air', provider: 'openrouter' },
        { id: 'openrouter/qwen/qwen3-coder:free', name: 'Qwen Qwen3 Coder', provider: 'openrouter' },
        { id: 'openrouter/cognitivecomputations/dolphin-mistral-24b-venice-edition:free', name: 'Dolphin Mistral 24B Venice', provider: 'openrouter' },
        { id: 'openrouter/qwen/qwen3-4b:free', name: 'Qwen Qwen3 4B', provider: 'openrouter' },
      ];
      setModels([...geminiModels, ...openRouterModels]);
      setOpenRouterAvailable(true);
    } catch (error) {
      setModelsError('Failed to load models');
      setOpenRouterAvailable(false);
    } finally {
      setModelsLoading(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      alert('Please enter a message before sending.');
      return;
    }

    sendMessage(
      {
        text: message.text || 'Sent with attachments',
        files: message.files
      },
      {
        body: {
          webSearch: webSearch,
          model: selectedModel,
        },
      },
    );

    setInput('');
  };

  return (
    <div className="h-screen w-full gradient-bg flex">
      {/* Left Sidebar - Model Selector & Memory */}
      <div className="w-80 glass-card border-r border-purple-500/30 flex flex-col">
        <div className="p-6 border-b border-purple-500/20">
          <div className="space-y-2">
            <label className="text-white/70 text-sm font-medium">AI Model</label>
            <Select value={selectedModel} onValueChange={(v) => setSelectedModel(v)}>
              <SelectTrigger className="w-full glass px-3 py-2 rounded-lg text-white border border-purple-500/30 focus:neon-glow focus:outline-none">
                <SelectValue placeholder={selectedModel ?? 'Select model'} />
              </SelectTrigger>

              <SelectContent className="glass bg-[rgba(255,255,255,0.04)]/40 border border-purple-500/20 backdrop-blur-md text-white">
                <SelectGroup>
                  <SelectLabel>Default</SelectLabel>
                  {displayModels
                    .filter((m) => m.provider === 'google')
                    .map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name.replace(/\s*\(Free\)$/, '')}
                      </SelectItem>
                    ))}

                  <SelectSeparator />

                  <SelectLabel>OpenRouter Models</SelectLabel>
                  {displayModels
                    .filter((m) => m.provider !== 'google')
                    .map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name.replace(/\s*\(Free\)$/, '')}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="mt-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full text-sm text-white/80 glass border border-purple-500/10">View all models</Button>
                </DialogTrigger>

                <DialogContent className="max-h-[60vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-white">Available Models</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-2 mt-3">
                    {displayModels.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        className="text-left glass p-3 rounded-md hover:neon-glow"
                        type="button"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">{m.name.replace(/\s*\(Free\)$/, '')}</div>
                            <div className="text-xs text-white/60">{m.provider}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="ghost">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <h3 className="text-white font-bold text-lg">Memory</h3>
          <p className="text-white/60 text-sm">Conversation History</p>
          <div className="mt-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-white/50 mt-8">
                <p className="text-sm">No conversations yet</p>
              </div>
            ) : (
              messages.slice(0, 5).map((message, index) => (
                <div key={message.id} className="glass p-3 rounded-lg cursor-pointer hover:neon-glow transition-all">
                  <p className="text-white/80 text-sm truncate">
                    {message.role === 'user' ? 'You: ' : 'AI: '}
                    {message.parts.find(p => p.type === 'text')?.text?.slice(0, 50)}...
                  </p>
                  <p className="text-white/50 text-xs mt-1">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Center Chat Container */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 glass m-4 rounded-2xl border border-purple-500/20 overflow-hidden">
          <Conversation className="h-full">
            <ConversationContent className="p-6">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="text-center text-white/70 mt-20 animate-fade-in">
                  <div className="mb-4">
                    <div className="w-16 h-16 purple-gradient rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse-purple">
                      <span className="text-white font-bold text-2xl">AI</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">Welcome to TAPSS AI</p>
                  <div className="text-white/60">
                    <p>TAPSS stands for Technology Assisted Personalized Student Support which is made with ❤️ by Thakur Anand Pratap Singh Suryavanshi.</p>
                    <p>Ask me anything and I'll respond using advanced AI technology.</p>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div key={message.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  {message.role === 'assistant' && message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                    <Sources>
                      <SourcesTrigger
                        count={
                          message.parts.filter(
                            (part) => part.type === 'source-url',
                          ).length
                        }
                      />
                      {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                        <SourcesContent key={`${message.id}-${i}`}>
                          <Source
                            key={`${message.id}-${i}`}
                            href={part.url}
                            title={part.url}
                          />
                        </SourcesContent>
                      ))}
                    </Sources>
                  )}
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Message key={`${message.id}-${i}`} from={message.role}>
                            <MessageContent>
                              <MessageResponse>
                                {part.text}
                              </MessageResponse>
                            </MessageContent>
                            {message.role === 'assistant' && i === messages.length - 1 && (
                              <MessageActions>
                                <MessageAction
                                  onClick={() => regenerate()}
                                  label="Retry"
                                >
                                  <RefreshCcwIcon className="size-3" />
                                </MessageAction>
                                <MessageAction
                                  onClick={() =>
                                    navigator.clipboard.writeText(part.text)
                                  }
                                  label="Copy"
                                >
                                  <CopyIcon className="size-3" />
                                </MessageAction>
                              </MessageActions>
                            )}
                          </Message>
                        );
                      case 'reasoning':
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
              {status === 'submitted' && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>

        {/* Bottom Input Bar */}
        <div className="mx-4 mb-4">
          <PromptInput onSubmit={handleSubmit} className="glass rounded-2xl border border-purple-500/30 neon-glow" globalDrop multiple>
            <PromptInputHeader>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
            </PromptInputHeader>

            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="text-white placeholder:text-white/50"
              />
            </PromptInputBody>

            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>

                <PromptInputButton
                  variant={webSearch ? 'default' : 'ghost'}
                  onClick={() => setWebSearch(!webSearch)}
                  className="hover:neon-glow"
                >
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </PromptInputButton>

                <PromptInputSpeechButton className="hover:neon-glow" />

                <span className="text-xs text-white/70 ml-2">
                  {selectedModel}
                </span>
              </PromptInputTools>

              <PromptInputSubmit
                disabled={!input && !status}
                status={status}
                className="neon-glow hover:neon-glow"
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>


    </div>
  );
};

export default GeminiChatbot;

