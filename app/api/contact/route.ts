import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
            // temp code
            if (process.env.NODE_ENV !== "production") {
                return NextResponse.json({
                    success: true,
                    testMode: true,
                });
            }



        const data = await request.json();

        const { name, phone, message, procedure } = data;

        if (
            typeof name !== "string" ||
            name.trim().length < 2 ||
            typeof phone !== "string" ||
            phone.trim().length < 8
        ) {
            return NextResponse.json(
                { error: "Jméno a telefon jsou povinné." },
                { status: 400 }
            );
        }

        if (
            !procedure ||
            typeof procedure !== "object" ||
            typeof procedure.categoryId !== "string" ||
            typeof procedure.category !== "string" ||
            typeof procedure.name !== "string" ||
            typeof procedure.price !== "string" ||
            !procedure.categoryId.trim() ||
            !procedure.name.trim()
        ) {
            return NextResponse.json(
                { error: "Vyberte prosím proceduru." },
                { status: 400 }
            );
        }

        // Dočasně blokované kadeřnické služby.
        if (procedure.categoryId === "hair") {
            return NextResponse.json(
                {
                    error: "Objednávání kadeřnických služeb je dočasně pozastaveno.",
                    code: "HAIR_BOOKING_DISABLED",
                },
                { status: 403 }
            );
        }



       // Локальне тестування: не надсилаємо повідомлення в Telegram.
            if (process.env.NODE_ENV !== "production") {
                return NextResponse.json({
                    success: true,
                    testMode: true,
                });
            }

            const botToken = process.env.TELEGRAM_BOT_TOKEN;
            const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            return NextResponse.json(
                { error: "Telegram není nakonfigurován." },
                { status: 500 }
            );
        }

        const text = `
🔔 NOVÁ ŽÁDOST O OBJEDNÁNÍ

👤 Jméno: ${name.trim()}
📞 Telefon: ${phone.trim()}

✨ Kategorie: ${procedure.category}
💅 Procedura: ${procedure.name}
💰 Cena: ${procedure.price}

💬 Komentář:
${typeof message === "string" && message.trim()
    ? message.trim()
    : "Bez komentáře"}
        `.trim();

        const telegramResponse = await fetch(
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

        if (!telegramResponse.ok) {
            return NextResponse.json(
                { error: "Žádost se nepodařilo odeslat." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch {
        return NextResponse.json(
            { error: "Došlo k chybě serveru." },
            { status: 500 }
        );
    }
}