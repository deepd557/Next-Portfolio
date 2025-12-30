import emailjs from '@emailjs/browser';

// Initialize EmailJS
const initEmailJS = () => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
};

// Send email using EmailJS
export const sendEmail = async (formData) => {
  try {
    initEmailJS();
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      message: formData.message,
      to_name: 'Portfolio Owner',
    };

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      message: 'Email sent successfully!',
      response
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
      error
    };
  }
};

// Alternative: Send email using API route (for server-side handling)
export const sendEmailAPI = async (formData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    return {
      success: true,
      message: 'Email sent successfully!',
      data: result
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      message: error.message || 'Failed to send email. Please try again.',
    };
  }
};



