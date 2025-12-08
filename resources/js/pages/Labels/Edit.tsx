import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';
import countries from 'world-countries';
import Select from 'react-select';

interface LabelData {
    id: number;
    name: string;
    country: string;
    description: string;
    logo: string;
    website: string;
}

interface Props {
    label: LabelData;
}

export default function Edit() {
    const { label } = usePage().props as Props;

    const { data, setData, put, processing, errors } = useForm({
        name: label.name || '',
        country: label.country || '',
        description: label.description || '',
        logo: label.logo || '',
        website: label.website || '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('labels.update', label.id));
    }

    const countryOptions = countries
        .map(country => ({
            value: country.name.common,
            label: `${country.flag} ${country.name.common}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <AppLayout breadcrumbs={[{title: 'Edit Label', href: `/labels/${label.id}/edit`}]}>
            <Head title="Update Label" />
            
            <div className="w-8/12 p-4">
                <div className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className='space-y-1.5'>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            placeholder="Record Label Name" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="country">Country</Label>
                        <Select
                            value={countryOptions.find(opt => opt.value === data.country) || null}
                            onChange={(option) => setData('country', option?.value || '')}
                            options={countryOptions}
                            placeholder="Select a country"
                            isSearchable
                            isClearable
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: '#d1d5db',
                                    borderRadius: '0.375rem',
                                    padding: '0.125rem',
                                    minHeight: '42px',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 50,
                                }),
                            }}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            placeholder="About this record label..." 
                            value={data.description} 
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="logo">Logo URL (Optional)</Label>
                        <Input 
                            type="url"
                            placeholder="https://..." 
                            value={data.logo} 
                            onChange={(e) => setData('logo', e.target.value)}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input 
                            type="url"
                            placeholder="https://..." 
                            value={data.website} 
                            onChange={(e) => setData('website', e.target.value)}
                        />
                    </div>

                    <Button 
                        disabled={processing} 
                        onClick={handleUpdate} 
                        className="mt-4"
                    >
                        {processing ? 'Updating...' : 'Update Label'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}