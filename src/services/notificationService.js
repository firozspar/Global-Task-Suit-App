const API_URL = 'https://prod-25.northcentralus.logic.azure.com:443/workflows/b1783a48359041a6b81ffc4f1496ae1b/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=6OFaWBJZWczrYsHFPJnYwN2tu2wLwB_Awu-1YAE-I1I'; // Replace with your Logic App URL

export const fetchNotifications = async () => {
    try {
        const response = await fetch(API_URL);
        console.log("notification response:",response);
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};
