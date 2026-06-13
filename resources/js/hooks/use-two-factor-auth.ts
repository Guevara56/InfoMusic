import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor';
import { useCallback, useMemo, useState } from 'react';

interface TwoFactorSetupData {
    svg: string;
    url: string;
}

interface TwoFactorSecretKey {
    secretKey: string;
}

export const OTP_MAX_LENGTH = 6;

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    return response.json();
};

export const useTwoFactorAuth = () => {
    const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
    const [manualSetupKey, setManualSetupKey] = useState<string | null>(null);
    const [recoveryCodesList, setRecoveryCodesList] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const hasSetupData = useMemo<boolean>(
        () => qrCodeSvg !== null && manualSetupKey !== null,
        [qrCodeSvg, manualSetupKey],
    );

    const clearErrors = useCallback((): void => {
        setErrors([]);
    }, []);

    const clearSetupData = useCallback((): void => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
        clearErrors();
    }, [clearErrors]);

    const fetchQrCode = useCallback(async (): Promise<void> => {
        const { svg } = await fetchJson<TwoFactorSetupData>(qrCode.url());
        setQrCodeSvg(svg);
    }, []);

    const fetchSetupKey = useCallback(async (): Promise<void> => {
        const { secretKey: key } = await fetchJson<TwoFactorSecretKey>(
            secretKey.url(),
        );

        setManualSetupKey(key);
    }, []);

    const fetchSetupData = useCallback(async (): Promise<void> => {
        try {
            clearErrors();
            setQrCodeSvg(null);
            setManualSetupKey(null);

            await Promise.all([fetchQrCode(), fetchSetupKey()]);
        } catch (error) {
            setQrCodeSvg(null);
            setManualSetupKey(null);
            setErrors(['No se pudo cargar el código QR del 2FA.']);
            throw error;
        }
    }, [clearErrors, fetchQrCode, fetchSetupKey]);

    const fetchRecoveryCodes = useCallback(async (): Promise<void> => {
        try {
            clearErrors();
            const codes = await fetchJson<string[]>(recoveryCodes.url());
            setRecoveryCodesList(codes);
        } catch {
            setErrors(['No se pudieron cargar los códigos de recuperación.']);
            setRecoveryCodesList([]);
        }
    }, [clearErrors]);

    return {
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        hasSetupData,
        errors,
        clearErrors,
        clearSetupData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    };
};