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
import { Fragment, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { CopyIcon, GlobeIcon, RefreshCcwIcon } from 'lucide-react';
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

const GeminiChatbot = () => {
  const [input, setInput] = useState('');
  const [webSearch, setWebSearch] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Flash');
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const { messages, sendMessage, status, regenerate } = useChat();

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
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full glass px-3 py-2 rounded-lg text-white border border-purple-500/30 focus:neon-glow focus:outline-none"
            >
              <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
              <optgroup label="OpenRouter Models">
                <option value="openrouter/allenai/olmo-3.1-32b-think:free">AllenAI OLMo 3.1 32B Think (Free)</option>
                <option value="openrouter/xiaomi/mimo-v2-flash:free">Xiaomi MiMo v2 Flash (Free)</option>
                <option value="openrouter/nvidia/nemotron-3-nano-30b-a3b:free">NVIDIA Nemotron 3 Nano 30B A3B (Free)</option>
                <option value="openrouter/mistralai/devstral-2512:free">MistralAI Devstral 2512 (Free)</option>
                <option value="openrouter/nex-agi/deepseek-v3.1-nex-n1:free">NexAGI DeepSeek v3.1 Nex N1 (Free)</option>
                <option value="openrouter/kwaipilot/kat-coder-pro:free">KwaiPilot Kat Coder Pro (Free)</option>
                <option value="openrouter/openai/gpt-oss-120b:free">OpenAI GPT OSS 120B (Free)</option>
                <option value="openrouter/z-ai/glm-4.5-air:free">Z-AI GLM 4.5 Air (Free)</option>
                <option value="openrouter/qwen/qwen3-coder:free">Qwen Qwen3 Coder (Free)</option>
                <option value="openrouter/cognitivecomputations/dolphin-mistral-24b-venice-edition:free">CognitiveComputations Dolphin Mistral 24B Venice (Free)</option>
                <option value="openrouter/qwen/qwen3-4b:free">Qwen Qwen3 4B (Free)</option>
              </optgroup>
            </select>
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
                  <p className="text-2xl font-bold text-white mb-2">Welcome to NEXUS AI</p>
                  <p className="text-white/60">
                    Ask me anything and I'll respond using advanced AI technology.
                  </p>
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

