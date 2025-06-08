import { Resend } from 'resend';

export const sendEmail = async (to: string, subject: string, react: React.ReactElement) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        react,
    });

    if (error) {
        throw error;
    }

    return data;
};