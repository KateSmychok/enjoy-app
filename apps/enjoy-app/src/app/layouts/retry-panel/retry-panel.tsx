import React from 'react';
import { Theme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { isRetryableError } from '@global/utils/errors';
import { Button } from '@global/components/buttons';
import { ButtonType } from '@global/utils/enum';

function paragraphStyles(theme: Theme) {
  return [theme.textStyles.labelSmall, { marginBottom: theme.spacing.sm }];
}

function RetryPanel({
  className,
  error,
  resetError,
  hideError = false,
  textMessage,
  textErrorMessage,
  textRetryButton,
}: {
  error: Error;
  className?: string;
  resetError: () => void;
  hideError?: boolean;
  textMessage?: string;
  textErrorMessage?: string;
  textRetryButton?: string;
}) {
  const canRetry = isRetryableError(error);

  const { t } = useTranslation();

  const messageCopy = textMessage ? t(textMessage) : t('RETRY_PANEL.MESSAGE');
  const errorMessageCopy = textErrorMessage
    ? t(textErrorMessage)
    : t('RETRY_PANEL.ERROR_MESSAGE');
  const retryButtonCopy = textRetryButton
    ? t(textRetryButton)
    : t('RETRY_PANEL.RETRY');

  return (
    <div className={className}>
      {canRetry && (
        <>
          <p css={paragraphStyles}>{messageCopy}</p>
          <Button variant={ButtonType.PRIMARY} onClick={() => resetError()}>
            {retryButtonCopy}
          </Button>
        </>
      )}
      {!canRetry && (
        <>
          <p
            css={paragraphStyles}
            data-error={hideError && error && error.toString()}
          >
            {errorMessageCopy}
          </p>

          {!hideError && (
            <p
              css={(theme: Theme) => [
                theme.textStyles.labelSmall,
                { marginBottom: theme.spacing.sm },
              ]}
            >
              <code>{error && error.toString()}</code>
            </p>
          )}

          <Button variant={ButtonType.PRIMARY} onClick={() => resetError()}>
            {retryButtonCopy}
          </Button>
        </>
      )}
    </div>
  );
}

export default RetryPanel;
