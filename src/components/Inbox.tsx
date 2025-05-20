import EventicaLogo from "../../public/images/Eventica.png";
import AutoGenerate from "../../public/images/auto-generate.jpg";
import MenuDots from "../../public/images/menu-dots-svgrepo-com.svg";
import DownloadIcon from "../../public/images/download icon.svg";
import AttachMedia from "../../public/images/attach-media.svg";
import SendIcon from "../../public/images/send-hor-svgrepo-com.svg";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";



export default function Inbox() {
  const [showSidebar, setShowSidebar] = useState(true);
  
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
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                      ×
                    </button>
                  )}
                </div>
                <div className="space-y-4 overflow-y-auto h-[calc(100%-60px)] pr-2 p-4">
                  {/* Active Message */}
                  <div className="flex items-center justify-between p-3 rounded-lg relative cursor-pointer transition hover:bg-[#F5FAFF]">
                    <div className="flex items-center gap-3">
                      <img
                        src={EventicaLogo}
                        alt="Eventica Logo"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          Eventica Travels
                        </div>
                        <div className="text-sm text-gray-600 truncate w-36">
                          Sounds Great
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm text-gray-500">14:22</span>
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                        2
                      </span>
                    </div>
                  </div>

                  {/* Other Message */}
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F5FAFF] cursor-pointer transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                      <div>
                        <div className="font-medium text-gray-700">
                          Askoli Adventure Tou...
                        </div>
                        <div className="text-sm text-gray-500 truncate w-36">
                          Okay great let's grou...
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">Yesterday</span>
                  </div>
                </div>
              </aside>
            )}

            {/* Chat Section */}
            <section className={`flex-1 flex flex-col ${showSidebar && window.innerWidth < 768 ? 'hidden' : 'block'}`}>
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
                    src={EventicaLogo}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700 font-medium">
                    Eventica Travels
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

                {/* Message Bubbles */}
                <MessageBubble
                  img={AutoGenerate}
                  text="Just booked your hingol national park tour for may 15th. Just wanted to confirm everything"
                  time="19:23"
                  align="left"
                />
                <MessageBubble
                  img={EventicaLogo}
                  text="Yes, I see your booking. Thanks for booking with us. Your spot is confirmed, and we'll see you on May 15th."
                  time="19:46"
                  align="right"
                />
                <MessageBubble
                  img={AutoGenerate}
                  text="Also, I'll be landing in Karachi a day earlier. Do you offer airport pickup?"
                  time="19:48"
                  align="left"
                />
                <MessageBubble
                  img={EventicaLogo}
                  text="Yes we do!"
                  time="19:53"
                  align="right"
                />

                {/* Attachments */}
                <div className="flex items-start space-x-3 max-w-[90%] md:max-w-[70%]">
                  <img
                    src={AutoGenerate}
                    alt=""
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  />
                  <div className="space-y-2">
                    {["Image.jpeg", "Document.xls"].map((name) => (
                      <div
                        key={name}
                        className="bg-white p-2 md:p-3 rounded-lg flex items-center justify-between shadow-sm border"
                      >
                        <span className="text-sm md:text-base text-gray-700">{name}</span>
                        <img
                          src={DownloadIcon}
                          alt="Download"
                          className="w-4 h-4 md:w-5 md:h-5"
                        />
                      </div>
                    ))}
                    <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm border text-sm md:text-base">
                      You can check out these files
                    </div>
                    <div className="text-xs text-gray-500 mt-1">19:53</div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 md:p-4 border-t bg-white flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Send a message..."
                    className="w-full border rounded-full p-2 md:p-3 pr-8 md:pr-10 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <img
                    src={AttachMedia}
                    alt="Attach"
                    className="w-4 h-4 md:w-5 md:h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                </div>
                <button className="p-2 md:p-3 rounded-lg transition">
                  <img src={SendIcon} alt="Send" className="w-[35px] md:w-[45px]" />
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
}: {
  img: string;
  text: string;
  time: string;
  align: "left" | "right";
}) {
  const isRight = align === "right";
  return (
    <div
      className={`flex items-start space-x-2 md:space-x-3 ${isRight ? "justify-end" : ""}`}
    >
      {!isRight && <img src={img} alt="" className="w-8 h-8 md:w-10 md:h-10 rounded-full" />}
      <div className="max-w-[90%] md:max-w-[70%]">
        <div
          className={`${
            isRight ? "bg-blue-100 text-gray-800" : "bg-white"
          } p-2 md:p-3 rounded-lg shadow-sm border text-sm md:text-base`}
        >
          {text}
        </div>
        <div
          className={`text-xs text-gray-500 mt-1 ${
            isRight ? "text-right" : ""
          }`}
        >
          {time}
        </div>
      </div>
      {isRight && <img src={img} alt="" className="w-8 h-8 md:w-10 md:h-10 rounded-full" />}
    </div>
  );
}
