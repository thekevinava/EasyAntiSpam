declare module "easyantispam" {
    interface EasyAntiSpamOptions {
        type: number;
        antiStaff?: boolean;
        dm?: boolean;
        warningMessage?: string;
    }

    export class Config {
        constructor(options:EasyAntiSpamOptions);
        private options: EasyAntiSpamOptions;
        public run(
            options: EasyAntiSpamOptions
        ): Promise<boolean>;
    }
}