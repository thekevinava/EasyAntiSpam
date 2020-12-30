declare module "easyantispam" {
    interface EasyAntiSpamOption {
        url?: boolean;
        discord?: boolean;
        antiStaff?: boolean;
        dm?: boolean;
    }

    export class Config {
        constructor(options:EasyAntiSpamOption);
        private options: EasyAntiSpamOption;
        public run(
            options: EasyAntiSpamOption
        ): Promise<boolean>;
    }
}