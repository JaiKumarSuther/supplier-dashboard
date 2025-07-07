import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { toast } from "sonner";

const EventicaLogo = "../../public/images/eventica.png";
const AutoGenerate = "../../public/images/auto-generate.jpg";
const MenuDots = "../../public/images/menu-dots-svgrepo-com.svg";
const DownloadIcon = "../../public/images/download-icon.svg";
const AttachMedia = "../../public/images/attach-media.svg";
const SendIcon = "../../public/images/send-hor-svgrepo-com.svg";

type Message = {
  message_id: string;
  sender_id: string;
  receiver_id: string;
  booking_id: string;
  message_text: string;
  message_file?: string | null;
  timestamp: string;
};

export default function Inbox() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [chatList, setChatList] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const userId = localStorage.getItem("user_id");

  // Handle responsiveness
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchChatList = async () => {
      const token = localStorage.getItem("token");

      if (!token || !userId) return;

      try {
        const res = await fetch(
          `http://localhost:9000/api/v1/chatting/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        console.log("📨 Chat List Response:", data);

        const chatData = Array.isArray(data)
          ? data
              .map((item: any) => {
                const sender = item?.sender;
                const receiver = item?.receiver;

                if (!sender || !receiver || !item?.booking) {
                  return null;
                }

                const isSender = sender.user_id === userId;
                const chatWith = isSender ? receiver : sender;

                return {
                  avatar: AutoGenerate,
                  name: chatWith?.full_name || "Unknown",
                  receiver_id: chatWith?.user_id,
                  booking_id: item.booking.booking_id,
                  last_message: item.message_text,
                  time: new Date(item.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  unread_count: 0,
                };
              })
              .filter(Boolean)
          : [];

        setChatList(chatData);
        setSelectedPerson(chatData.length > 0 ? chatData[0] : null);
      } catch (err) {
        toast.error("Could not load chats");
      }
    };

    fetchChatList();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      if (!selectedPerson?.booking_id || !token) return;

      try {
        const res = await fetch(
          `http://localhost:9000/api/v1/messages/booking/${selectedPerson.booking_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        toast.error("Failed to load messages");
      }
    };

    fetchMessages();
  }, [selectedPerson]);

  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    const senderId = localStorage.getItem("user_id");

    if (
      !token ||
      !senderId ||
      !selectedPerson?.receiver_id ||
      (!newMessage.trim() && !file)
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("booking_id", selectedPerson.booking_id);
    formData.append("sender_id", senderId);
    formData.append("receiver_id", selectedPerson.receiver_id);
    formData.append("message_text", newMessage);
    if (file) formData.append("message_file", file);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const res = await fetch("http://localhost:9000/api/v1/chatting/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await res.json();
      setMessages((prev) => [...prev, result.data]);
      setNewMessage("");
      setFile(null);
    } catch (err) {
      toast.error("Failed to send message.");
    }
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex w-full min-h-screen">
      <main className="flex-1 w-full">
        <div className="p-2 sm:p-4 lg:p-6">
          <div className="flex items-center mb-4 lg:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
              My Inbox
            </h1>
          </div>

          <div className="flex w-full h-[calc(100vh-120px)] sm:h-[80vh] border rounded-xl overflow-hidden bg-white relative shadow-lg">
            {/* Sidebar */}
            <aside
              className={`
              ${
                isMobile
                  ? `absolute inset-y-0 left-0 z-20 w-full bg-white transform transition-transform duration-300 ease-in-out ${
                      showSidebar ? "translate-x-0" : "-translate-x-full"
                    }`
                  : `relative w-80 lg:w-96 ${showSidebar ? "block" : "hidden"}`
              }
              border-r border-gray-200
            `}
            >
              <div className="flex justify-between items-center p-4 border-b bg-white">
                <h2 className="text-lg font-medium text-gray-700">Messages</h2>
                {isMobile && (
                  <button
                    onClick={handleSidebarToggle}
                    className="text-gray-500 hover:text-gray-700 p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="overflow-y-auto h-[calc(100%-60px)]">
                <div className="space-y-1 p-2">
                  {chatList.map((person, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedPerson(person);
                        if (isMobile) setShowSidebar(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-[#F5FAFF] ${
                        selectedPerson?.receiver_id === person.receiver_id &&
                        selectedPerson?.booking_id === person.booking_id
                          ? "bg-[#F5FAFF] border-l-4 border-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img
                          src={person.avatar}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                          alt="avatar"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-800 truncate">
                            {person.name}
                          </div>
                          <div className="text-sm text-gray-600 truncate">
                            {person.last_message}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs text-gray-500">
                          {person.time}
                        </span>
                        {person.unread_count > 0 && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {person.unread_count}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Chat Section */}
            <section
              className={`
              flex-1 flex flex-col min-w-0
              ${isMobile && showSidebar ? "hidden" : "flex"}
            `}
            >
              {/* Chat Header */}
              <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-white">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {(isMobile || !showSidebar) && (
                    <button
                      onClick={handleSidebarToggle}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Menu size={20} className="text-gray-600" />
                    </button>
                  )}
                  {selectedPerson && (
                    <>
                      <img
                        src={selectedPerson.avatar}
                        alt={selectedPerson.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                      <span className="text-gray-700 font-medium truncate">
                        {selectedPerson.name}
                      </span>
                    </>
                  )}
                </div>
                <img
                  src={MenuDots}
                  alt="Options"
                  className="w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto bg-gray-50">
                <div className="space-y-4 lg:space-y-6">
                  <div className="text-center text-gray-400 text-sm">
                    {new Date().toLocaleDateString()}
                  </div>
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.message_id}
                      img={
                        msg.sender_id === userId ? EventicaLogo : AutoGenerate
                      }
                      align={msg.sender_id === userId ? "right" : "left"}
                      text={msg.message_text}
                      file={msg.message_file}
                      time={new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    />
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 sm:p-4 border-t bg-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Send a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="w-full border border-gray-300 rounded-full py-2 sm:py-3 px-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <label className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 p-1 rounded-full transition-colors">
                      <img
                        src={AttachMedia}
                        alt="Attach"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                      <input
                        type="file"
                        accept="image/*,.pdf,.docx,.txt"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {file && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm">
                      <span className="text-blue-700 truncate max-w-[100px]">
                        {file.name}
                      </span>
                      <button
                        onClick={() => setFile(null)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() && !file}
                    className="p-2 sm:p-3 rounded-lg transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <img
                      src={SendIcon}
                      alt="Send"
                      className="w-[35px] sm:w-[45px]"
                    />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

// Message bubble component
function MessageBubble({
  img,
  text,
  time,
  align,
  file,
}: {
  img: string;
  text: string;
  time: string;
  align: "left" | "right";
  file?: string | null;
}) {
  const isRight = align === "right";

  return (
    <div
      className={`flex items-start gap-2 sm:gap-3 ${
        isRight ? "justify-end" : ""
      }`}
    >
      {!isRight && (
        <img
          src={img}
          alt=""
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
        />
      )}

      <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[60%] space-y-2">
        {text && (
          <div
            className={`
            p-3 sm:p-4 rounded-lg shadow-sm text-sm sm:text-base leading-relaxed
            ${
              isRight
                ? "bg-blue-100 text-gray-800"
                : "bg-white border border-gray-200"
            }
          `}
          >
            {text}
          </div>
        )}

        {file && (
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            {/\.(jpg|jpeg|png|gif|webp)$/i.test(file) ? (
              <img
                src={file}
                alt="Uploaded"
                className="max-w-full h-auto rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            ) : (
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm sm:text-base text-gray-700 truncate flex-1">
                  {file.split("/").pop()}
                </span>
                <a
                  href={file}
                  download={file.split("/").pop()}
                  className="hover:opacity-80 transition-opacity flex-shrink-0"
                >
                  <img
                    src={DownloadIcon}
                    alt="Download"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </a>
              </div>
            )}
          </div>
        )}

        <div
          className={`text-xs text-gray-500 px-1 ${
            isRight ? "text-right" : ""
          }`}
        >
          {time}
        </div>
      </div>

      {isRight && (
        <img
          src={img}
          alt=""
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
        />
      )}
    </div>
  );
}
