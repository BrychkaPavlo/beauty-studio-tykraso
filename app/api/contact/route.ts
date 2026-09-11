import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const { name, phone, message } = data;

        if (!name || !phone) {
            return NextResponse.json(
                { error: "Ім'я та телефон обов'язкові" },
                { status: 400 }
            );
        }

        const botToken =
            process.env.TELEGRAM_BOT_TOKEN;

        const chatId =
            process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            return NextResponse.json(
                { error: "Telegram не налаштований" },
                { status: 500 }
            );
        }

        const text = `
🔔 НОВА ЗАЯВКА

👤 Ім'я: ${name}
📞 Телефон: ${phone}

💬 Коментар:
${message || "Без коментаря"}
        `.trim();

        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                }),
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "Не вдалося надіслати заявку" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
        });

    } catch {
        return NextResponse.json(
            { error: "Помилка сервера" },
            { status: 500 }
        );
    }
}