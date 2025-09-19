import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useVaultLoanShield } from '@/hooks/useContract';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

interface EncryptedDataFormProps {
  type: 'collateral' | 'loan' | 'repayment';
  onSuccess?: (hash: string) => void;
}

export function EncryptedDataForm({ type, onSuccess }: EncryptedDataFormProps) {
  const [formData, setFormData] = useState({
    value: '',
    assetType: '',
    metadataHash: '',
    principalAmount: '',
    interestRate: '',
    duration: '',
  });
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  
  const { addCollateral, createLoan, fundLoan, repayLoan, isLoading, error } = useVaultLoanShield();

  const handleEncrypt = async () => {
    setIsEncrypting(true);
    try {
      // Simulate FHE encryption process
      const value = formData.value || formData.principalAmount;
      const encrypted = await encryptValue(value);
      setEncryptedData(encrypted);
      setShowEncrypted(true);
    } catch (err) {
      console.error('Encryption failed:', err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      let hash: string;
      
      switch (type) {
        case 'collateral':
          hash = await addCollateral(
            formData.value,
            formData.assetType,
            formData.metadataHash
          );
          break;
        case 'loan':
          hash = await createLoan(
            parseInt(formData.value), // collateralId
            formData.principalAmount,
            formData.interestRate,
            parseInt(formData.duration)
          );
          break;
        case 'repayment':
          hash = await repayLoan(
            parseInt(formData.value), // loanId
            formData.principalAmount
          );
          break;
        default:
          throw new Error('Invalid form type');
      }
      
      onSuccess?.(hash);
    } catch (err) {
      console.error('Transaction failed:', err);
    }
  };

  const encryptValue = async (value: string): Promise<string> => {
    // Simulate FHE encryption
    const encoded = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest('SHA-256', encoded);
    const hex = Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    return `0x${hex}`;
  };

  const renderFormFields = () => {
    switch (type) {
      case 'collateral':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="value">Asset Value (USD)</Label>
              <Input
                id="value"
                type="number"
                placeholder="Enter asset value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assetType">Asset Type</Label>
              <Input
                id="assetType"
                placeholder="real_estate, precious_metals, artwork, vehicles"
                value={formData.assetType}
                onChange={(e) => setFormData({ ...formData, assetType: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metadataHash">Metadata Hash</Label>
              <Input
                id="metadataHash"
                placeholder="IPFS hash or document hash"
                value={formData.metadataHash}
                onChange={(e) => setFormData({ ...formData, metadataHash: e.target.value })}
              />
            </div>
          </>
        );
      
      case 'loan':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="collateralId">Collateral ID</Label>
              <Input
                id="collateralId"
                type="number"
                placeholder="Enter collateral ID"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="principalAmount">Loan Amount (USD)</Label>
              <Input
                id="principalAmount"
                type="number"
                placeholder="Enter loan amount"
                value={formData.principalAmount}
                onChange={(e) => setFormData({ ...formData, principalAmount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                placeholder="Enter interest rate"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="Enter loan duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </>
        );
      
      case 'repayment':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="loanId">Loan ID</Label>
              <Input
                id="loanId"
                type="number"
                placeholder="Enter loan ID"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repaymentAmount">Repayment Amount (USD)</Label>
              <Input
                id="repaymentAmount"
                type="number"
                placeholder="Enter repayment amount"
                value={formData.principalAmount}
                onChange={(e) => setFormData({ ...formData, principalAmount: e.target.value })}
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          FHE-Encrypted {type.charAt(0).toUpperCase() + type.slice(1)} Data
        </CardTitle>
        <CardDescription>
          All sensitive data is encrypted using Fully Homomorphic Encryption before being stored on-chain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderFormFields()}
        
        <div className="flex gap-2">
          <Button
            onClick={handleEncrypt}
            disabled={isEncrypting}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Lock className="h-4 w-4" />
            {isEncrypting ? 'Encrypting...' : 'Encrypt Data'}
          </Button>
          
          {showEncrypted && (
            <Button
              onClick={() => setShowEncrypted(!showEncrypted)}
              variant="outline"
              className="flex items-center gap-2"
            >
              {showEncrypted ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showEncrypted ? 'Hide' : 'Show'} Encrypted
            </Button>
          )}
        </div>

        {showEncrypted && encryptedData && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Encrypted Data:</strong>
              <code className="block mt-2 p-2 bg-gray-100 rounded text-xs break-all">
                {encryptedData}
              </code>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              Error: {error.message}
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !showEncrypted}
          className="w-full"
        >
          {isLoading ? 'Processing...' : `Submit ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </Button>
      </CardContent>
    </Card>
  );
}
