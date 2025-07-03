const EventicaLogo = "../../public/images/eventica.png";
const AutoGenerate = "../../public/images/auto-generate.jpg";
const MenuDots = "../../public/images/menu-dots-svgrepo-com.svg";
const DownloadIcon = "../../public/images/download-icon.svg";
const AttachMedia = "../../public/images/attach-media.svg";
const SendIcon = "../../public/images/send-hor-svgrepo-com.svg";
import { toast } from "sonner";

type Message = {
  message_id: string;
  sender_id: string;
  receiver_id: string;
  booking_id: string;
  message_text: string;
  message_file?: string | null; // <-- Add this line
  timestamp: string;
};

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function Inbox() {
  const people = [
    {
      name: "Eventica Travels",
      avatar: EventicaLogo,
      booking_id: "BK001",
      receiver_id: "receiver-1",
      last_message: "Sounds Great",
      time: "14:22",
      unread_count: 2,
    },
    {
      name: "Askoli Adventure",
      avatar: AutoGenerate,
      booking_id: "BK002",
      receiver_id: "receiver-2",
      last_message: "Okay great let's group",
      time: "Yesterday",
      unread_count: 0,
    },
  ];
  const [showSidebar, setShowSidebar] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [file, setFile] = useState<File | null>(null);

  const [newMessage, setNewMessage] = useState(""); // Replace or get from props/context
  const [receiverId] = useState("receiver-user-id"); // Replace based on conversation

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      if (!selectedPerson?.booking_id || !token) return;

      try {
        const res = await fetch(
          `http://localhost:9000/api/v1/messages/booking/${selectedPerson.booking_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("❌ Failed to fetch messages:", error);
        toast.error("Failed to load messages");
      }
    };

    fetchMessages();
  }, [selectedPerson]);
  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    if (!newMessage.trim() && !file) return;

    const formData = new FormData();
    formData.append("booking_id", selectedPerson.booking_id);
    formData.append("receiver_id", selectedPerson.receiver_id);
    formData.append("message_text", newMessage);
    if (file) formData.append("message_file", file);

    try {
      const res = await fetch("http://localhost:9000/api/v1/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Message send failed");
      const result = await res.json();
      setMessages((prev) => [...prev, result.data]);
      setNewMessage("");
      setFile(null);
    } catch (error) {
      console.error("❌ Failed to send message:", error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="flex w-full">
      <main className="flex-1 w-full">
        <div className="p-2 md:p-6">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              My Inbox
            </h1>
          </div>

          <div className="flex w-full h-[80vh] border rounded-xl overflow-hidden bg-white relative">
            {/* Sidebar */}
            {showSidebar && (
              <aside className="w-full md:w-1/3 border-r absolute md:relative z-10 bg-white h-full">
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-lg font-medium text-gray-700">
                    Messages
                  </h2>
                  {window.innerWidth < 768 && (
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="text-gray-500"
                    >
                      x
                    </button>
                  )}
                </div>
                <div className="space-y-4 overflow-y-auto h-[calc(100%-60px)] pr-2 p-4">
                  {people.map((person, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedPerson(person)}
                      className={`flex items-center justify-between p-3 rounded-lg relative cursor-pointer transition ${
                        selectedPerson.name === person.name
                          ? "bg-[#F5FAFF]"
                          : ""
                      } hover:bg-[#F5FAFF]`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={person.avatar}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-800">
                            {person.name}
                          </div>
                          <div className="text-sm text-gray-600 truncate w-36">
                            {person.last_message}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm text-gray-500">
                          {person.time}
                        </span>
                        {person.unread_count > 0 && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {person.unread_count}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            )}

            {/* Chat Section */}
            <section
              className={`flex-1 flex flex-col ${
                showSidebar && window.innerWidth < 768 ? "hidden" : "block"
              }`}
            >
              {/* Chat Header */}
              <div className="flex justify-between items-center p-4 border-b bg-white">
                <div className="flex items-center gap-3">
                  {window.innerWidth < 768 && !showSidebar && (
                    <button
                      onClick={() => setShowSidebar(true)}
                      className="mr-2"
                    >
                      <Menu size={20} />
                    </button>
                  )}
                  <img
                    src={selectedPerson.avatar}
                    alt={selectedPerson.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700 font-medium">
                    {selectedPerson.name}
                  </span>
                </div>
                <img
                  src={MenuDots}
                  alt="Options"
                  className="w-5 h-5 cursor-pointer"
                />
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 md:p-5 overflow-y-auto space-y-4 md:space-y-6 bg-gray-50">
                <div className="text-center text-gray-400 text-sm">
                  25 Sep 2025
                </div>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.message_id}
                    img={
                      msg.sender_id === receiverId ? AutoGenerate : EventicaLogo
                    }
                    text={msg.message_text}
                    file={msg.message_file} // 👈 Add this
                    time={new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    align={msg.sender_id === receiverId ? "left" : "right"}
                  />
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 md:p-4 border-t bg-white flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Send a message..."
                    value={newMessage} // ✅ Bind the input to state
                    onChange={(e) => setNewMessage(e.target.value)} // ✅ Update state on change
                    className="w-full border rounded-full p-2 md:p-3 pr-8 md:pr-10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <label className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2">
                    <img
                      src={AttachMedia}
                      alt="Attach"
                      className="w-4 h-4 md:w-5 md:h-5"
                    />
                    <input
                      type="file"
                      accept="image/*,.pdf,.docx,.txt"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-2 md:p-3 rounded-lg transition"
                >
                  <img
                    src={SendIcon}
                    alt="Send"
                    className="w-[35px] md:w-[45px]"
                  />
                </button>
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
      className={`flex items-start space-x-2 md:space-x-3 ${
        isRight ? "justify-end" : ""
      }`}
    >
      {!isRight && (
        <img
          src={img}
          alt=""
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
      )}
      <div className="max-w-[90%] md:max-w-[70%] space-y-2">
        <div
          className={`${
            isRight ? "bg-blue-100 text-gray-800" : "bg-white"
          } p-2 md:p-3 rounded-lg shadow-sm border text-sm md:text-base`}
        >
          {text}
        </div>
        {file && (
          <div className="bg-white p-2 md:p-3 rounded-lg flex items-center justify-between shadow-sm border">
            <span className="text-sm md:text-base text-gray-700 truncate max-w-[150px]">
              {file.split("/").pop()}
            </span>
            <a href={file} download>
              <img
                src={DownloadIcon}
                alt="Download"
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </a>
          </div>
        )}
        <div
          className={`text-xs text-gray-500 mt-1 ${
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
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
      )}
    </div>
  );
}
