type TransactionInitializeResult =
	| {
			errors?: Array<{ message?: string | null; code?: string | null }> | null;
			transactionEvent?: { message?: string | null; type?: string | null } | null;
			data?: unknown;
	  }
	| null
	| undefined;

const failureEventTypes = new Set(["AUTHORIZATION_FAILURE", "CHARGE_FAILURE"]);

export const getTransactionInitializeErrorMessage = (result: TransactionInitializeResult): string | null => {
	if (!result) {
		return "Transaction initialization failed";
	}

	const graphqlError = result.errors?.[0];
	if (graphqlError?.message) {
		return graphqlError.code ? `${graphqlError.message} (${graphqlError.code})` : graphqlError.message;
	}

	const eventType = result.transactionEvent?.type;
	if (eventType && failureEventTypes.has(eventType)) {
		return result.transactionEvent?.message || `Payment failed (${eventType})`;
	}

	if (eventType?.includes("FAILURE")) {
		return result.transactionEvent?.message || `Payment failed (${eventType})`;
	}

	if (!result.data) {
		return result.transactionEvent?.message || "Could not retrieve payment details from the gateway";
	}

	return null;
};

export const logTransactionInitializeFailure = (result: TransactionInitializeResult, context: string) => {
	console.error(`[${context}] Transaction initialize failed:`, {
		errors: result?.errors,
		transactionEvent: result?.transactionEvent,
		data: result?.data,
	});
};
