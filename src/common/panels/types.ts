export type FinalPanelConfig = {
	initialWidth: number;
	minWidth: number;
	maxWidth: number;
};

export type FinalPanelsConfig = FinalPanelConfig[];

export type PanelConfig = Partial<FinalPanelConfig>;

export type PanelsConfig = PanelConfig[];
