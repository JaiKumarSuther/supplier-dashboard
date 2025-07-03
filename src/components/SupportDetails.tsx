// src/components/support/SupportDetails.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData, updateTicket } from "../api/index";  // Import the API utilities

type Ticket = {
  ticket_id: string;
  subject: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string | null;
  related_to: string;
};

const SupportDetails = () => {
  const { ticketId } = useParams();  // Extract ticket ID from URL
  const [ticket, setTicket] = useState<Ticket | null>(null);  // Explicit type for ticket state
  const [adminResponse, setAdminResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Explicit error type
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure ticketId is defined before trying to fetch ticket data
    if (!ticketId) {
      setError("Ticket ID is missing");
      setLoading(false);
      return;
    }

    const getTicketDetails = async () => {
      try {
        const fetchedTicket = await fetchData<Ticket>(`/support/${ticketId}`);
        setTicket(fetchedTicket); // Update state with fetched ticket
      } catch (error) {
        setError("Failed to fetch ticket details.");
      } finally {
        setLoading(false);
      }
    };

    getTicketDetails();
  }, [ticketId]);

  const handleCloseTicket = async () => {
    if (!ticketId) {
      setError("Ticket ID is missing");
      return;
    }
    try {
      await updateTicket(ticketId, { status: "closed" });
      navigate("/support"); // Redirect to the support page after closing the ticket
    } catch (error) {
      setError("Failed to close the ticket.");
    }
  };

  const handleAddResponse = async () => {
    if (!ticketId) {
      setError("Ticket ID is missing");
      return;
    }
    try {
      await updateTicket(ticketId, { admin_responses: adminResponse });
      setAdminResponse("");  // Reset input after response is added
    } catch (error) {
      setError("Failed to add admin response.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="ticket-details">
      <h1>Ticket {ticket?.ticket_id}</h1>
      <p>Subject: {ticket?.subject}</p>
      <p>Status: {ticket?.status}</p>
      <p>Description: {ticket?.description}</p>

      <div>
        <h3>Admin Response:</h3>
        <textarea
          value={adminResponse}
          onChange={(e) => setAdminResponse(e.target.value)}
          placeholder="Add response..."
        ></textarea>
        <button onClick={handleAddResponse}>Add Response</button>
      </div>

      <div>
        <button onClick={handleCloseTicket}>Close Ticket</button>
      </div>
    </div>
  );
};

export default SupportDetails;
