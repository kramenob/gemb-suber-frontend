// Function to fetch client data from backend

import { APP_URL } from '@/config'

export async function fetchClient() {
  const response = await fetch(`${APP_URL}/api/v1/client`);
  if (!response.ok) {
    throw new Error('Failed to fetch client data');
  }
  return response.json();
}