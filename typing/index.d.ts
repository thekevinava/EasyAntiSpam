declare module "easyantispam" {
    interface EasyAntiSpamData {
        message: {
            author: string;
            content: string;
            date: number;
        }[];
        warned: string[];
        kicked: string[];
        banned: string[];
    }

    interface EasyAntiSpamOptions {
        urls?: boolean;
        discordInvites?: boolean;
        allowUrlImages?: boolean;
        dm?: boolean;
        messageLink?: string;
        messageFlood?: string;
        messageKicked?: string;
        messageBanned?: string;
        allowBots?: boolean;
        allowedPerms?: string[];
        warnRow?: number;
        kickRow?: number;
        banRow?: number;
        rowInterval?: number;
        warnDuplicates?: number;
        kickDuplicates?: number;
        banDuplicates?: number;
        duplicatesInterval?: number;
        canKick?: boolean;
        canBan?: boolean;
        banDays?: number;
    }

    export class EasyAntiSpam {
        constructor(options?: EasyAntiSpamOptions);
        public options: EasyAntiSpamOptions;
        public data: EasyAntiSpamData;

        public run(message): Promise<boolean>;
    }
}