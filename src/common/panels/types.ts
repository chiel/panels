export type PanelConfig = {
	defaultSize?: number;
	maxSize?: number;
	minSize?: number;
	size?: number;
};

export type FinalPanelConfig = {
	initialWidth: number;
	minWidth: number;
	maxWidth: number;
};

export type FinalPanelsConfig = FinalPanelConfig[];

export type OldPanelConfig = Partial<FinalPanelConfig>;

export type PanelsConfig = OldPanelConfig[];
